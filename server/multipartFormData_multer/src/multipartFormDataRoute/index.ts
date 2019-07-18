import { Router } from 'express'
import fs from 'fs'
import path from 'path'

import { multerWrapper, uploadToDisk } from '../lib/multerManager'

const router = Router()

router.post('/text-only', multerWrapper(uploadToDisk.none()), (req, res, next) => {
    console.log('Received text filed :: ', req.body)
    res.json(req.body)
})

router.post('/profile', multerWrapper(uploadToDisk.single('avatar')), (req, res, next) => {
    // console.log(req.files) // undefined
    console.log(req.file)
    res.json({ success: true })
})
router.post('/photos/upload', multerWrapper(uploadToDisk.array('photos', 12)), (req, res, next) => {
    console.log(req.files)
    res.json({ success: true })
})
router.post('/any', multerWrapper(uploadToDisk.any()), (req, res, next) => {
    console.log(req.files)
    res.json({ success: true })
})

router.get('/file', (req, res) => {
    const fileNames = fs.readdirSync(path.resolve(__dirname, '../../uploads'))

    if (fileNames.length === 0) {
        throw new Error('No file exist')
    }

    res.sendFile(path.resolve(__dirname, `../../uploads/${fileNames[0]}`))
})

export default router
