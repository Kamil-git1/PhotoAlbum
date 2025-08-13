const asyncHandler = require("express-async-handler")

const Comment = require("../../model/comment/Comment")
const validateId = require("../utils/validateId")
//create comment
const createCommentCtrl = asyncHandler(async (req, res) => {


  const {userName, collectionId, description} = req.body
  
  
  
  try {
    const comment = await Comment.create({
      collectionId: collectionId,
      user:userName,
      description:description,
    })
    res.json(comment)
    
  } catch (error) {
    res.json(error)
  }
})
//fetch all comments

const fetchAllCommentsCtrl = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find({}).sort("-created")
    res.json(comments)
  } catch (error) {
    res.json(error)
  }
})

const fetchCommentCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const comment = await Comment.findById(id)
    res.json(comment)
  } catch (error) {
    res.json(error)
  }
})
//update
const updateCommentCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateId(id)
  try {
    const update = await Comment.findByIdAndUpdate(
      id,
      {
        post: req.body.postId,
        user: req.user,
        description: req.body.description,
      },
      {
        new: true,
        runValidators: true,
      }
    )
    res.json(update)
  } catch (error) {
    res.json(error)
  }
})
const deleteCommentCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params
 
  try {
    const comment = await Comment.findByIdAndDelete(id)
    res.json(comment)
  } catch (error) {
    res.json(error)
  }
})
module.exports = {
  createCommentCtrl,
  fetchAllCommentsCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
}
