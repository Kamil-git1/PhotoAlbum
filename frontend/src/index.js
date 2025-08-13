import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"

import App  from "./App"
import { Provider } from "react-redux"
import store from "./redux/store/store"
import "./index.css"
import "./utils/i18n.js"
import { CircularProgress } from "@mui/material"


const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <Suspense fallback={<CircularProgress />}>
    <Provider store={store}>
      <App/>
    </Provider>
  </Suspense>
)
