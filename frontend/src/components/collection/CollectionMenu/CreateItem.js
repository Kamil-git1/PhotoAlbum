import React from "react"

import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import AddIcon from "@mui/icons-material/Add"
import Popover from "@mui/material/Popover"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"

import AddToPhotosIcon from "@mui/icons-material/AddToPhotos"
import Dropzone from "react-dropzone"
import { ButtonGroup, IconButton, TextField } from "@mui/material"
import { useDispatch} from "react-redux"
import * as Yup from "yup"
import { useFormik } from "formik"
import { createItemAction } from "../../../redux/slices/items/itemsSlice"

import { useTranslation } from "react-i18next"
const formSchema = Yup.object({
  title: Yup.string().required("title is required"),
  description: Yup.string(),

  itemImg: Yup.string().required("image is required"),
})

export default function CreateItem(props) {
  const dispatch = useDispatch()

  const { t } = useTranslation()
  //------collection id
  const id = props.collection.collection.id
  const userId = props.collection.collection.user



  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      itemImg: "",
      collectionId: id,
      userId: userId,
    },
    onSubmit: (values) => {
      const data = {
        title: values?.title,
        collectionId: id,
        description: values?.description,
        itemImg: values?.itemImg,
        userId:userId
      }

      dispatch(createItemAction(data))
    },
    validationSchema: formSchema,
  })

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <React.Fragment>
          <ButtonGroup fullWidth {...bindTrigger(popupState)}>
            <AddToPhotosIcon style={{width:'maxContent'}}/>
            {t("Add_Item")}
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
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                fullWidth
                variant="standard"
                type="text"
                placeholder="Title"
                autoComplete="text"
              />
              <TextField
                value={formik.values.description}
                onChange={formik.handleChange("description")}
                onBlur={formik.handleBlur("description")}
                fullWidth
                variant="standard"
                type="text"
                autoComplete="text"
                placeholder="Description"
              />

              <Dropzone
                onBlur={formik.handleBlur("itemImg")}
                onDrop={(acceptedFiles) => {
                  formik.setFieldValue("itemImg", acceptedFiles[0])
                }}
              >
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <CloudUploadIcon sx={{ m: 0.5 }} />
                      {acceptedFiles.map((file) => (
                        <li style={{ listStyle: "none" }} key={file.path}>
                          {file.path}
                        </li>
                      ))}
                    </div>
                  </section>
                )}
              </Dropzone>
              <IconButton type="submit">
                <AddIcon />
              </IconButton>
            </form>
          </Popover>
        </React.Fragment>
      )}
    </PopupState>
  )
}
