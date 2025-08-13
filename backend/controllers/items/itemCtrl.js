const Item = require("../../model/Item/Item")
const asyncHandler = require("express-async-handler")
const validateId = require("../utils/validateId")
const cloudUploadImg = require("../utils/cloudConn")
const fs = require("fs")

const createItemCtrl = asyncHandler(async (req, res) => {
  const { collectionId, description, title, userId } = req.body

  const localPath = `${req.file.filename}`

  const imgUploaded = await cloudUploadImg(localPath)
  if (req.user.id === userId || req.user.isAdmin) {
    try {
      const item = await Item.create({
        title: title,
        collectionId: collectionId,
        description: description,
        itemImg: imgUploaded?.url,
      })

      fs.unlinkSync(localPath)
      res.json(item)
    } catch (error) {
      res.json(error)
    }
  }
})

//fetch all items
const fetchItemsCtrl = asyncHandler(async (req, res) => {
  try {
    const items = await Item.find({}).populate("user")
    res.json(items)
  } catch (error) {}
})

const fetchItemCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateId(id)
  try {
    const item = await Item.findById(id)
      .populate("user")
      .populate("disLikes")
      .populate("likes")
    res.json(item)
  } catch (error) {
    res.json(error)
  }
})
//update item
const updateItemCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateId(id)

  try {
    const item = await Item.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: req.user?._id,
      },
      {
        new: true,
      }
    )
    res.json(item)
  } catch (error) {
    res.json(error)
  }
})

//delete item
const deleteItemCtrl = asyncHandler(async (req, res) => {
  const paramsString = req.params.id.split(",")
  const userId = paramsString[0]
  const itemId = paramsString[1]

  
  if (req.user.id === userId || req.user.isAdmin) {
    try {
      const item = await Item.findByIdAndDelete(itemId)
      res.json(item)
    } catch (error) {
      res.json(error)
    }
    res.json("Delete")
  }
})

const toggleAddLikeToItemCtrl = asyncHandler(async (req, res) => {
  //1.Find the collection to be liked
  const { itemId } = req.body
  const item = await Item.findById(itemId)
  //2. Find the login user
  const loginUserId = req?.user?._id
  //3. Find is this user has liked this item

  const isLiked = item?.isLiked
  //4.Chech if this user has dislikes this item

  //Toggle
  //Remove the user if he has liked the item
  if (isLiked) {
    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    )
    res.json(item)
  } else {
    //add to likes
    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    )
    res.json(item)
  }
})

module.exports = {
  updateItemCtrl,
  createItemCtrl,
  toggleAddLikeToItemCtrl,
  fetchItemsCtrl,
  fetchItemCtrl,
  deleteItemCtrl,
}
