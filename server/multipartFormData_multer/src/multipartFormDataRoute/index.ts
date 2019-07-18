import { Router } from 'express'

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

export default router
