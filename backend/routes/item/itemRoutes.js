const express = require("express")
const {
  createItemCtrl,
 toggleAddLikeToItemCtrl,
  fetchItemCtrl,
  fetchItemsCtrl,
  updateItemCtrl,
  deleteItemCtrl,
  
} = require("../../controllers/items/itemCtrl")

const authMiddleware = require("../../middlewares/auth/authMiddleware")
const {
  imageResize,
  imageUpload,
} = require("../../middlewares/uploads/imageUpload")
const itemRoutes = express.Router()

itemRoutes.post(
  "/",
  authMiddleware,
  imageUpload.single("itemImg"),
  imageResize,
  createItemCtrl
    
)
itemRoutes.put("/like", authMiddleware, toggleAddLikeToItemCtrl)
itemRoutes.get("/", fetchItemsCtrl)
itemRoutes.get("/:id", fetchItemCtrl)
itemRoutes.put("/:id", updateItemCtrl)
itemRoutes.delete("/:id", authMiddleware, deleteItemCtrl)
module.exports = itemRoutes
