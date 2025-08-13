const colors = require("colors")
const express = require("express")
require("dotenv").config()
const dbConnect = require("./config/db/dbConnect")
const userRoutes = require("./routes/user/usersRoute")
const { errorHandler } = require("./middlewares/error/errorHandler")
const itemRoutes = require("./routes/item/itemRoutes")
const commentRoute = require("./routes/comment/commentRoute")
const collectionRoutes = require("./routes/collection/collectionRoutes")
const cors = require("cors")
const path = require("path")
const session = require("express-session")
const cookieSession = require("cookie-session")
const passport = require("passport")
const passportSetup = require("./config/passport/passport")
const socialMediaRoutes = require("./routes/socialMedia/socialMediaRoutes")
dbConnect()
//server
const app = express()


//passport 

app.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
)
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())

app.use(passport.session())

app.use(cors())

app.use(express.json())

//users route
app.use("/api/users", userRoutes)
app.use("/api/items", itemRoutes)
app.use("/api/comments", commentRoute)
app.use("/api/collection", collectionRoutes)
app.use("/api/auth", socialMediaRoutes)

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", req.headers.origin)
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  )
  if ("OPTIONS" == req.method) {
    res.send(200)
  } else {
    next()
  }
})
//-------------------------------------------------------------------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  )
} else {
  app.get("/", (req, res) => res.send("Please set to production"))
}
//error handler
app.use(errorHandler)
//server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`.cyan))
