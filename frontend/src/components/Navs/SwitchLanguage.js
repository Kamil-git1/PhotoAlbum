
import {
  Box,
  ListItem,
  ListItemButton,
  Popover,
} from "@mui/material"
import i18next from "i18next"
import React from "react"
import { useTranslation } from "react-i18next"

import Flag from "react-world-flags"
import DoneIcon from "@mui/icons-material/Done"
function SwitchLanguage() {
  const { t } = useTranslation()
  const switchLanguage = () => {
    if (i18next.language === "en") {
      return i18next.changeLanguage("pl")
    } else {
      i18next.changeLanguage("en")
    }
  }
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined
  return (
    <React.Fragment>
      <ListItemButton
        aria-describedby={id}
        onClick={handleClick}
        sx={{ maxWidth: "50px" }}
      >
        {i18next.language === "en" ? (
          <Flag code="gb" height="16" width="22" style={{ display: "block" }} />
        ) : (
          <Flag code="pol" height="16" width="22" />
        )}
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
        sx={{ cursor: "pointer" }}
      >
        <ListItem>
          <Box sx={{ color: "text.primary" }} onClick={() => switchLanguage()}>
            <Flag code="gb" height="16" width="22" />
            {t("English")}
            {i18next.language === "en" ? <DoneIcon color="success" /> : null}
          </Box>
        </ListItem>
        <ListItem>
          <Box sx={{ color: "text.primary" }} onClick={() => switchLanguage()}>
            <Flag code="pol" height="16" width="22" />
            {t("Polish")}
            {i18next.language === "pl" ? <DoneIcon color="success" /> : null}
          </Box>
        </ListItem>
      </Popover>
    </React.Fragment>
  )
}

export default SwitchLanguage
