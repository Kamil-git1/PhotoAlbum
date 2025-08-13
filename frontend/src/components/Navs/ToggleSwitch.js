import Brightness4 from "@mui/icons-material/Brightness4"
import Brightness7 from "@mui/icons-material/Brightness7"
import {  Box, Switch } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {
  addDarkTheme,
  removeDarkTheme,
  toggleTheme,
} from "../../redux/slices/theme/themeSlice"
import * as React from "react"
export const ToggleSwitch = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme)
  const { darkTheme } = theme

  React.useEffect(() => {
    darkTheme ? dispatch(addDarkTheme()) : dispatch(removeDarkTheme())
  }, [darkTheme, dispatch])

  return (
    <Box sx={{ alignSelf: "center",display:"flex",alignItems:"center" }}>
      <Switch checked={darkTheme} onChange={() => dispatch(toggleTheme())} />
      {darkTheme ? <Brightness4 /> : <Brightness7 />}
    </Box>
  )
}
