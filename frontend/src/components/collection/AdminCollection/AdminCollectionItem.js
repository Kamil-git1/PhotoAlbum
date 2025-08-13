import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import FavoriteIcon from "@mui/icons-material/Favorite"

import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import {
  deleteItemAction,
  toggleAddLikesToItem,
} from "../../../redux/slices/items/itemsSlice"

export default function AdminCollectionItem(props) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  // id to validate user
  const userId = props.user
  const itemId = props.items._id
  //delete string to server
  const deleteString = `${userId},${itemId}`
  return (
    <Card sx={{ maxWidth: 350, bgcolor: "background.default" }}>
      <CardMedia
        component="img"
        alt=""
        height="200"
        image={`${props.items.itemImg}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.items.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.items.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button onClick={() => dispatch(toggleAddLikesToItem(props.items._id))}>
          <FavoriteIcon />
          {props.items.likes.length}
        </Button>

        <Button
          onClick={() => dispatch(deleteItemAction(deleteString))}
          size="small"
        >
          {t("Delete")}
        </Button>
      </CardActions>
    </Card>
  )
}
