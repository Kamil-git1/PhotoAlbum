import React, { useEffect } from "react"
import Footer from "../../Navs/Footer"
import Navbar from "../../Navs/Navbar"
import Grid from "@mui/material/Grid"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsersCollection } from "../../../redux/slices/users/usersSlices"
import { Alert, Box, CircularProgress, FormControl, MenuItem, Select } from "@mui/material"
import MyCollectionsCard from "./MyCollectionsCard"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function MyCollections() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [key, setKey] = React.useState("asc")

  const users = useSelector((state) => state?.users)

  const { userCollections, loading, appErr, serverErr, userAuth } = users
  const stateCollection = useSelector((state) => state?.collection)
  const { isEdited, isDeleted } = stateCollection
  const itemState = useSelector((state) => state?.item)
  const commentState = useSelector((state) => state.comment)

  useEffect(() => {
    dispatch(fetchUsersCollection(key))

    if (!userAuth || userAuth.isBlocked === true) return navigate("/")
  }, [
    isDeleted,
    isEdited,
    itemState.isDeleted,
    itemState.isCreated,
    itemState.likes,
    userAuth,
    navigate,
    dispatch,
    commentState.isCreated,
    commentState.isDeleted,
    key
  ])
  return (
    <Box>
      <Navbar />
      <Box
        container
        sx={{
          minHeight: "100vh",
          alignItems:"center",
          display:"flex",
          flexDirection:"column"
        }}
      >
        {loading ? (
          <Box sx={{ alignSelf: "center" }}>
            <CircularProgress sx={{ maxHeight: "200px" }} disableShrink />
          </Box>
        ) : appErr || serverErr ? (
          <Box>
            <Alert severity="error" sx={{ maxHeight: "200px", width: "400px" }}>
              {appErr}
              {serverErr}
            </Alert>
          </Box>
        ) : serverErr || appErr || !Array.isArray(userCollections) ? (
          <Box>
            <Alert severity="error" sx={{ maxHeight: "200px", width: "400px" }}>
              {t("No_collection_found")}
            </Alert>
          </Box>
        ) : userCollections?.length <= 0 ? (
          <Box>
            <Alert severity="error" sx={{ maxHeight: "200px", width: "400px" }}>
              {t("No_collection_found")}
            </Alert>
          </Box>
        ) : (
          <React.Fragment>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="standard"
                  value={key}
                  label="Sorting"
                  onChange={(e) => setKey(e.target.value)}
                >
                  <MenuItem value="asc">Smaller first</MenuItem>
                  <MenuItem value="dsc">Bigger first</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Grid
              justifyContent="center"
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {userCollections?.map((_, index) => (
                <div key={index}>
                  <MyCollectionsCard
                    collection={userCollections[index]}
                  ></MyCollectionsCard>
                </div>
              ))}
            </Grid>
          </React.Fragment>
        )}
      </Box>
      <Footer />
    </Box>
  )
}
