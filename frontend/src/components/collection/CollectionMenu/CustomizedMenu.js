import * as React from "react"
import { styled } from "@mui/material/styles"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import ArchiveIcon from "@mui/icons-material/Archive"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { ButtonGroup} from "@mui/material"
import EditCollection from "./EditCollection"
import { useDispatch } from "react-redux"
import CreateItem from "./CreateItem"

import { deleteCollectionAction } from "../../../redux/slices/collection/collectionSlice"
import { useTranslation } from "react-i18next"

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 90,

    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,

        marginRight: theme.spacing(1.5),
      },
    },
  },
}))

export default function CustomizedMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // id to validate user
  const userId = props.collection.collection.user
  const collectionId = props.collection.collection._id
  //delete string to server
  const deleteString = `${userId},${collectionId}`

  return (
    <div>
      <ButtonGroup
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ color: "inherit" }}
        disableElevation
        onClick={handleClick}
      >
        <MoreVertIcon />
      </ButtonGroup>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          <EditCollection collection={props} />
        </MenuItem>
        <MenuItem disableRipple>
          <CreateItem collection={props.collection} />
        </MenuItem>
        <MenuItem
          onClick={() => dispatch(deleteCollectionAction(deleteString))}
          disableRipple
        >
          
            <ArchiveIcon />
            {t("Delete")}
        
        </MenuItem>
      </StyledMenu>
    </div>
  )
}
