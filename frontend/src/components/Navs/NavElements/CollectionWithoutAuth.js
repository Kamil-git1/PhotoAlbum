import * as React from "react"
import Popover from "@mui/material/Popover"
import { ListItem, ListItemButton } from "@mui/material"
import { Link } from "react-router-dom"
import { Box } from "@mui/system"
import { useTranslation } from "react-i18next"

export default function CollectionWithoutAuth() {
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
      <ListItemButton aria-describedby={id} onClick={handleClick}>
        Collection
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
        <ListItem sx={{ color: "text.primary" }}>
          <Link to="/view-collections">
            <Box sx={{ color: "text.primary" }}>{t("View_Collections")}</Box>
          </Link>
        </ListItem>
      </Popover>
    </React.Fragment>
  )
}
