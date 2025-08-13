const express = require("express")
const asyncHandler = require("express-async-handler")
const { get } = require("lodash")
const axios = require("axios")
const querystring = require("node:querystring")
const githubRoutes = express.Router()
const jwt = require("jsonwebtoken")

//-------------------------------------------------------------------------
async function getGitHubUser({ code }) {
  const githubToken = await axios
    .post(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}`
    )
    .then((res) => res.data)

    .catch((error) => {
      throw error
    })
console.log(githubToken)
  const decoded = querystring.parse(githubToken)
  const accessToken = decoded.access_token
  return axios
    .get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Error getting user from GitHub`)
      throw error
    })
}
//-------------------------------------------------------------------------

const github = asyncHandler(async (req, res) => {
  const code = get(req, "query.code")
  const path = get(req, "query.path", "/")
  if (!code) {
    throw new Error("No code!")
  }
  const gitHubUser = await getGitHubUser({ code })
  const token = jwt.sign(gitHubUser, process.env.GITHUB_SECRET)

  res.cookie(process.env.COOKIE_NAME, token, {
    httpOnly: true,
    domain: "localhost",
  })

  res.redirect(`http://localhost:3000${path}`)
})

const githubUser = asyncHandler(async(req,res)=>{
 const cookie = get(req, `cookies[${COOKIE_NAME}]`)

 try {
   const decode = jwt.verify(cookie, secret)
  
   return res.send(decode)
 } catch (e) {
   return res.send(null)
 }
})

githubRoutes.get("/", github, githubUser)

module.exports = githubRoutes
