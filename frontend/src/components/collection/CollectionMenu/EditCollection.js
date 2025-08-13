import * as React from "react"
import AddIcon from "@mui/icons-material/Add"
import Popover from "@mui/material/Popover"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import EditIcon from "@mui/icons-material/Edit"
import {
  ButtonGroup,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { updateCollectionAction } from "../../../redux/slices/collection/collectionSlice"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useTranslation } from "react-i18next"
const formSchema = Yup.object({
  name: Yup.string(),
  tags: Yup.string(),
})

export default function EditCollection(props) {
  const dispatch = useDispatch()

  //collection
  const propCollection = props.collection.collection.collection
  const id = propCollection._id
  const { t } = useTranslation()
  const state = useSelector((state) => state?.users)

  const { loading } = state

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: propCollection.name,
      tags: propCollection.tags,
    },
    onSubmit: (values) => {
      const data = {
        name: values.name,
        tags: values.tags,
        id,
      }
      dispatch(updateCollectionAction(data))
    },
    validationSchema: formSchema,
  })

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <ButtonGroup {...bindTrigger(popupState)}>
            <EditIcon />
            {t("Edit_Collection")}
          </ButtonGroup>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <TextField
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                fullWidth
                variant="standard"
                type="text"
                placeholder="Change Name"
                autoComplete="text"
              />
              <TextField
                value={formik.values.tags}
                onChange={formik.handleChange("tags")}
                onBlur={formik.handleBlur("tags")}
                fullWidth
                variant="standard"
                type="text"
                autoComplete="text"
                placeholder="Add Tags"
              />
              {loading ? (
                <CircularProgress />
              ) : (
                <IconButton type="submit">
                  <AddIcon />
                </IconButton>
              )}
            </form>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}
