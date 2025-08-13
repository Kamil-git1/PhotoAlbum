const express = require("express")
const passport = require("passport")
const generateToken = require("../../config/token/generateToken")


const socialMediaRoutes = express.Router()
let l
process.env.NODE_ENV === "production"
  ? (l = "https://kamilreactproject.herokuapp.com/")
  : (l = "http://localhost:3000")

let CLIENT_URL = `${l}`
socialMediaRoutes.get(
  "/github",
  passport.authenticate("github", { scope: ["profile"] })
)

socialMediaRoutes.get(
  "/github/callback",
  passport.authenticate("github"),
  function (req, res) {
    return (
      res.cookie(
        "user",
        {
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          isAdmin: req.user.isAdmin,
          token: generateToken(req.user._id),
          isBlocked: req.user.isBlocked,
        },
        {
          maxAge: 24 * 60 * 60 * 1000,
          path: CLIENT_URL,
        }
      ) + res.redirect(CLIENT_URL)
    )
  }
)

module.exports = socialMediaRoutes
