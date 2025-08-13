import { createTheme } from "@mui/material"


export const lightTheme = createTheme({
  palette: {
    mode: "light",
   
    background: {
      paper: "#fff",
      default: "#fff",
    },
    text: {
      primary: "#222",
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
   
    background: {
      default: "#222",
      paper: "#333",
    },
    text: {
      primary: "#fff",
    },
  },
})


