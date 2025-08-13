const GitHubStrategy = require("passport-github2").Strategy
const passport = require("passport")
const User = require("../../model/user/User")

GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
      
    },
    async (accessToken, refreshToken, profile, done) => {
      User.findOne({ name: profile.username }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser)
        } else {
          new User({
            name: profile.username,
            email: profile.profileUrl,
            password: profile.nodeId,
          })
            .save()
            .then((newUser) => {
              done(null, newUser)
            })
        }
      })
    }
  )
)
