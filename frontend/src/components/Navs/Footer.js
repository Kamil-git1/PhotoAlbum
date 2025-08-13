
import React from "react"
import { Link } from "react-router-dom"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"
import GoogleIcon from "@mui/icons-material/Google"
import InstagramIcon from '@mui/icons-material/Instagram';
import { Box } from "@mui/material"
function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ m: 1 }}>
        <Link to="#" role="button">
          <FacebookIcon fontSize="large" sx={{ color: "text.secondary" }} />
        </Link>

        <Link to="#" role="button">
          <TwitterIcon fontSize="large" sx={{ color: "text.secondary" }} />
        </Link>

        <Link to="#" role="button">
          <GoogleIcon fontSize="large" sx={{ color: "text.secondary" }} />
        </Link>

        <Link to="#" role="button">
          <InstagramIcon fontSize="large" sx={{ color: "text.secondary" }} />
        </Link>

        <Link to="#" role="button">
          <LinkedInIcon fontSize="large" sx={{ color: "text.secondary" }} />
        </Link>

        <Link to="" role="button">
          <GitHubIcon fontSize="large" sx={{ color: "text.secondary" }} />
        </Link>
      </Box>
      <Box sx={{ m: 1 }}>© 2022 Copyright: Funny Images</Box>
    </Box>
  )
}

export default Footer
