import * as React from "react"
import { styled } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Collapse from "@mui/material/Collapse"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CommentIcon from "@mui/icons-material/Comment"
import AddIcon from "@mui/icons-material/Add"
import { TextField } from "@mui/material"
import { Box } from "@mui/system"
import Moment from "react-moment"
import DeleteIcon from "@mui/icons-material/Delete"
import CollectionsIcon from "@mui/icons-material/Collections"

import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import { useFormik } from "formik"
import { createCommentAction, deleteCommentAction } from "../../../redux/slices/comments/commentsSlice"
import AdminCollectionItem from "./AdminCollectionItem"

import AdminCardMenu from "./AdminCardMenu/AdminCardMenu"
const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

const formSchema = Yup.object({
  description: Yup.string().required(),
})

export default function AdminCollectionCard(props) {
  const [expanded, setExpanded] = React.useState(false)
  const [comments, setComments] = React.useState(false)
  const [collectionItems, setCollectionItems] = React.useState(false)
  const dispatch = useDispatch()
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const handleCommentsClick = () => {
    setComments(!comments)
  }

  const handleCollectionItemsClick = () => {
    setCollectionItems(!collectionItems)
  }
  const user = useSelector((state) => state.users)
  const { userAuth } = user

  const formik = useFormik({
    initialValues: {
      description: "",
      userName: userAuth.name,
      collectionId: props?.collection?._id,
    },
    onSubmit: (values) => {
      const data = {
        description: values?.description,
        userName: userAuth.name,
        collectionId: props?.collection?._id,
      }

      dispatch(createCommentAction(data))
    },
    validationSchema: formSchema,
  })

  return (
    <Card
      sx={{
        width: 350,
        maxHeight: "100%",
        margin: "2rem",
        bgcolor: "background.default",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{}} aria-label="recipe">
            {props.collection.user !==null? (props.collection.user.name.slice(0, 1)) :null }
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <AdminCardMenu collection={props} />
          </IconButton>
        }
        title={`${props.collection.name}`}
        subheader={<Moment format="D MMM YYYY" withTitle></Moment>}
      />

      <CardMedia
        component="img"
        
        image={`${props.collection.imageLink}`}
        alt="collection photo"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box>
          <ExpandMore
            expand={comments}
            onClick={handleCommentsClick}
            aria-expanded={comments}
            aria-label="show more"
          >
            <CommentIcon />
          </ExpandMore>
        </Box>
        <ExpandMore
          expand={collectionItems}
          onClick={handleCollectionItemsClick}
          aria-expanded={collectionItems}
          aria-label="show more"
        >
          <CollectionsIcon />
        </ExpandMore>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={comments} timeout="auto" unmountOnExit>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              value={formik.values.description}
              onChange={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
              sx={{ width: "85%" }}
              variant="standard"
            ></TextField>
            <IconButton type="submit">
              <AddIcon />
            </IconButton>
          </form>

          {props?.collection?.comments.map((comment, index) => (
            <Box sx={{ display: "flex", alignItems: "flex-end" }} key={index}>
              <Avatar
                sx={{
                  color: "action.active",
                  mr: 1,
                  my: 0.5,
                  fontSize: "12px",
                  height: "1.5rem",
                  width: "1.5rem",
                }}
              >
                {comment.user.slice(0, 1)}
              </Avatar>
              <TextField
                variant="standard"
                disabled
                label={comment.user}
                value={comment.description}
              />
              <IconButton
                onClick={() => dispatch(deleteCommentAction(comment._id))}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </CardContent>
      </Collapse>
      <Collapse in={collectionItems} timeout="auto" unmountOnExit>
        {props.collection.items.map((_, index) => (
          <div key={index}>
            <AdminCollectionItem
              items={props.collection.items[index]}
              user={props.collection.user}
            ></AdminCollectionItem>
          </div>
        ))}
      </Collapse>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.collection.tags}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
