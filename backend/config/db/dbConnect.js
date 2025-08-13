const mongoose = require("mongoose")

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log(`${mongoose.connection.host}`.yellow)
  } catch (error) {
    console.log(`Error ${error.message}`)
  }
}

module.exports = dbConnect
