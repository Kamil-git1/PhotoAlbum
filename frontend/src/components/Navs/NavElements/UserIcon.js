import * as React from "react"
import Popover from "@mui/material/Popover"
import Typography from "@mui/material/Typography"
import PersonIcon from "@mui/icons-material/Person"
import { useSelector } from "react-redux"
export default function UserIcon() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
const { userAuth } = useSelector((state) => state.users)
  const open = Boolean(anchorEl)

  return (
    <div className="iconNav3">
      <Typography
      component="span"
        
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <PersonIcon/>
      </Typography>
      <Popover
        
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
          
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{userAuth?.name}</Typography>
      </Popover>
    </div>
  )
}
