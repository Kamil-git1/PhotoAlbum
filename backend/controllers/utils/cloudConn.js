const cloudinary = require("cloudinary")

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
})

const cloudUploadImg = async img => {
  try {
    const data = await cloudinary.uploader.upload(img, {
      resource_type: "auto",
    })

    return {
      url: data?.secure_url,
    }
  } catch (error) {
    return error
  }
}

module.exports = cloudUploadImg
