import { createSlice } from "@reduxjs/toolkit"
import { isString } from "formik"

const localStorageTheme = localStorage.getItem("darkTheme")

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkTheme: isString(localStorageTheme),
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme
    },
    removeDarkTheme: () => {
      localStorage.removeItem("darkTheme")
    },
    addDarkTheme: () => {
      localStorage.setItem("darkTheme", true)
    },
  },
})

export const { toggleTheme, removeDarkTheme,addDarkTheme } = themeSlice.actions

export default themeSlice.reducer
