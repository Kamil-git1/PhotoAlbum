const multer = require("multer")
const sharp = require("sharp")
//storage
const multerStorage = multer.memoryStorage()

//file type checking
const multerFilter = (req, file, cb) => {
  //check file type

  if (file.mimetype.startsWith("image")) {
    cb(null, true)
  } else {
    cb(
      {
        message: "Unsupported file format",
      },
      false
    )
  }
}

const imageUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
})

const imageResize = async (req, res, next) => {
  if (!req.file) return next()
  req.file.filename = `collection-${Date.now()}-${req.file.originalname}`

  await sharp(req.file.buffer)
    .resize(500,500,{
      

      fit: "fill",
    })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`${req.file.filename}`)
  next()
}

module.exports = { imageUpload, imageResize }
