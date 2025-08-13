import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Typography from "@mui/material/Typography"

import { Button, CardActions } from "@mui/material"

import { useDispatch, useSelector } from "react-redux"
import { toggleAddLikesToItem } from "../../../redux/slices/items/itemsSlice"

export default function ViewCollectionItem(props) {
  const item = props.items
  const dispatch = useDispatch()

  const user = useSelector((state) => state?.users)
  const { userAuth } = user
  
  return (
    <Card sx={{ maxWidth: 350, bgcolor:"background.default" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={`${item.itemImg}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <CardActions>
          {userAuth ? (
            <Button onClick={() => dispatch(toggleAddLikesToItem(item._id))}>
              <FavoriteIcon />
              
              {item.likes.length}
            </Button>
          ) : null}
        </CardActions>
      </CardContent>
    </Card>
  )
}
