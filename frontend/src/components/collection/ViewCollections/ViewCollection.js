import React, { useEffect } from "react"
import Footer from "../../Navs/Footer"
import Navbar from "../../Navs/Navbar"
import Grid from "@mui/material/Grid"
import { fetchCollectionAction } from "../../../redux/slices/collection/collectionSlice"
import { useDispatch, useSelector } from "react-redux"
import {
  Alert,
  CircularProgress,
  Box,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material"
import ViewCollectionCard from "./ViewCollectionCard"

import { useTranslation } from "react-i18next"

export default function ViewCollection() {
  const [key, setKey] = React.useState("asc")
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const itemState = useSelector((state) => state?.item)
  const { likes } = itemState

  const collection = useSelector((state) => state?.collection)

  const { collectionList, loading, appErr, serverErr, foundCollections } =
    collection
  const commentState = useSelector((state) => state.comment)
  useEffect(() => {
    dispatch(fetchCollectionAction(key))
  }, [dispatch, commentState.isCreated, likes, foundCollections, key])

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <Box sx={{ alignSelf: "center" }}>
            <CircularProgress sx={{ alignSelf: "center" }} />
          </Box>
        ) : appErr || serverErr ? (
          <Box>
            <Alert severity="error" sx={{ maxHeight: "200px", width: "400px" }}>
              {appErr}
              {serverErr}
            </Alert>
          </Box>
        ) : Array.isArray(collectionList) && collectionList.length > 0 ? (
          <React.Fragment>
            <Box sx={{ width: "120px", mb: 5, mt: 5 }}>
              <FormControl>
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
              {collectionList?.map((_, index) => (
                <div key={index}>
                  <ViewCollectionCard
                    collection={collectionList[index]}
                  ></ViewCollectionCard>
                </div>
              ))}
            </Grid>
          </React.Fragment>
        ) : (
          <Alert severity="error" sx={{ maxHeight: "200px", width: "400px" }}>
            {t("No_collection_found")}
          </Alert>
        )}
      </Box>
      <Footer />
    </Box>
  )
}
