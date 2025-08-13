import * as React from "react"
import Popover from "@mui/material/Popover"
import {  ListItem, ListItemButton } from "@mui/material"
import { Link } from "react-router-dom"
import { Box } from "@mui/system"
import { useTranslation } from "react-i18next"

export default function ManageUsers() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const { t } = useTranslation()
  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <React.Fragment>
      <ListItemButton
        aria-describedby={id}
        
        onClick={handleClick}
        
      >
        Manage users
      </ListItemButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ListItem>
          <Link to="/manage-users">
            <Box sx={{ color: "text.primary" }}>{t("Manage_Users")}</Box>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/admin-collection">
            <Box sx={{ color: "text.primary" }}>
              {t("Manage_users_collections")}
            </Box>
          </Link>
        </ListItem>
      </Popover>
    </React.Fragment>
  )
}
