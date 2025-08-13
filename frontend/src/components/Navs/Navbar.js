import { Box, ListItemButton } from "@mui/material"
import * as React from "react"
import SearchBar from "./SearchBar"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { logoutAction } from "../../redux/slices/users/usersSlices"
import { useTranslation } from "react-i18next"

import UserIcon from "./NavElements/UserIcon"
import useWindowDimensions from "../../hooks/WindowDimensionHook"
import { ToggleSwitch } from "./ToggleSwitch"
import MenuIcon from "@mui/icons-material/Menu"
import SwitchLanguage from "./SwitchLanguage"
import ManageUsers from "./NavElements/ManageUsers"
import Collection from "./NavElements/Collection"
import CollectionWithoutAuth from "./NavElements/CollectionWithoutAuth"
function Navbar() {
  const [expanded, setExpanded] = React.useState(false)
  const { width } = useWindowDimensions()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userAuth } = useSelector((state) => state.users)
  const { t } = useTranslation()

  const collection = useSelector((state) => state?.collection.collectionList)
  React.useEffect(() => {
    if (width > 990) {
      setExpanded(true)
    }
  }, [width])

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        boxShadow: "rgba(117, 115, 115, 0.25) 0px 1px 12px;",
      }}
      className="header__navigation"
    >
      <Box className="navbar__toggler">
        <ListItemButton onClick={() => setExpanded(!expanded)}>
          <MenuIcon sx={{ cursor: "pointer" }} />
        </ListItemButton>
      </Box>

      {expanded ? (
        <Box className="hide__navbar">
          <Box style={{ display: "flex", flexBasis: "100%" }}>
            <Box className="iconNav" sx={{ alignSelf: "center" }}>
              <ToggleSwitch />
            </Box>
            <SwitchLanguage />
            <Box className="navbar__logo">Photo Album</Box>
          </Box>

          <Box sx={{ display: "flex" }} className="wraplist">
            {userAuth?.isAdmin ? <ManageUsers /> : null}

            {userAuth ? (
              <React.Fragment>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Collection />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        dispatch(logoutAction()).then(() => navigate("/"))
                      }}
                    >
                      {t("Logout")}
                    </ListItemButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mr: 2,
                      ml: 2,
                    }}
                  >
                    <UserIcon />
                  </Box>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <CollectionWithoutAuth />
                <ListItemButton>
                  <Link to="/">
                    <Box sx={{ color: "text.primary" }}>{t("Login")}</Box>
                  </Link>
                </ListItemButton>
              </React.Fragment>
            )}

            <Box sx={{ mr: 3, display: "flex", alignItems: "center" }}>
              <SearchBar data={collection} />
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}

export default Navbar
