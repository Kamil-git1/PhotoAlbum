import React, { useEffect } from "react"
import Footer from "../../Navs/Footer"
import Navbar from "../../Navs/Navbar"
import Grid from "@mui/material/Grid"
import { useDispatch, useSelector } from "react-redux"

import { Alert, CircularProgress } from "@mui/material"
import AdminCollectionCard from "./AdminCollectionCard"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { fetchCollectionAction } from "../../../redux/slices/collection/collectionSlice"

export default function AdminCollection() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const users = useSelector((state) => state?.users)

  const { userCollections, loading, appErr, serverErr, userAuth } = users
  const stateCollection = useSelector((state) => state?.collection)
  const { isEdited, isDeleted, collectionList } = stateCollection
  const itemState = useSelector((state) => state?.item)
  const commentState = useSelector((state) => state.comment)

  useEffect(() => {
    dispatch(fetchCollectionAction())

    if (!userAuth || userAuth.isBlocked || !userAuth.isAdmin)
      return navigate("/")
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
  ])
  return (
    <div>
      <Navbar />
      <Grid
        container
        sx={{
          minHeight: "100vh",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <div>
            <CircularProgress sx={{ maxHeight: "200px" }} disableShrink />
          </div>
        ) : appErr || serverErr ? (
          <div>
            <Alert severity="error" sx={{ maxHeight: "200px", width: "400px" }}>
              {appErr}
              {serverErr}
            </Alert>
          </div>
        ) : Array.isArray(collectionList) && collectionList?.length > 0 ? (
          <Grid
            justifyContent="center"
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {collectionList?.map((_, index) => (
              <div key={index}>
                <AdminCollectionCard
                  collection={collectionList[index]}
                ></AdminCollectionCard>
              </div>
            ))}
          </Grid>
        ) : (
          <h2>{t("No_collection_found")}</h2>
        )}
      </Grid>
      <Footer />
    </div>
  )
}
