const multer = require('multer')
const path = require('path')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")

exports.upload_1 = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type npt supported"), false)
            return
        }
        cb(null, true)
    },
})


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});
exports.upload_2 = multer({
    storage
})