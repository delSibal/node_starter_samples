import express = require('express')
import multer from 'multer'
import path from 'path'

type MulterHandler = (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void
) => void
const MAX_UPLOAD_FILE_SIZE = 1000000 * 5 // 5MB

const storage = {
    memory: multer.memoryStorage(),
    disk: multer.diskStorage({
        destination: (req, file, cb) => {
            const savingPath = path.resolve(__dirname, '../../uploads')
            cb(null, savingPath)
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.fieldname)
        }
    })
}

const fileFilter: MulterHandler = (req, file, cb) => {
    if (file.size > MAX_UPLOAD_FILE_SIZE) {
        // cb(new Error(`Failed to upload. Limit size is ${MAX_UPLOAD_FILE_SIZE}`))
        return cb(null, false)
    }
    return cb(null, true)
}

const options: { [type: string]: multer.Options } = {
    disk: { storage: storage.disk },
    memory: { storage: storage.memory },
    filter: { fileFilter: fileFilter }
}

// const uploadToMemory = multer({ ...options.memory, ...options.filter })
const uploadToDisk = multer({ ...options.disk, ...options.fileFilter })

const multerWrapper = (multerMiddleware: express.RequestHandler): express.RequestHandler => {
    return function (req, res, next) {
        multerMiddleware(req, res, err => {
            if (err) {
                console.log('[multerWrapper] Error occurred:: ' + err)
                return next(new Error(err))
            }
            next()
        })
    }
}

export { uploadToDisk, multerWrapper }
