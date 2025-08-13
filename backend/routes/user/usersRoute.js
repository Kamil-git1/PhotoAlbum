const express = require("express")
const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  deleteUsersCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updateUserPasswordCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  addAdminCtrl,
  removeAdminCtrl,
 

  
} = require("../../controllers/users/usersController")

const authMiddleware = require("../../middlewares/auth/authMiddleware")
const userRoutes = express.Router()

userRoutes.post("/register", userRegisterCtrl)
userRoutes.post("/login", loginUserCtrl)
userRoutes.get("/", authMiddleware, fetchUsersCtrl)
userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl)
userRoutes.put("/update/:id", authMiddleware, updateUserCtrl)
userRoutes.put('/block-user', authMiddleware, blockUserCtrl)
userRoutes.put('/add-admin', authMiddleware, addAdminCtrl)
userRoutes.put('/remove-admin', authMiddleware, removeAdminCtrl )
userRoutes.put('/unblock-user', authMiddleware, unBlockUserCtrl)
userRoutes.put("/password/update", authMiddleware, updateUserPasswordCtrl)
userRoutes.delete("/delete/:id",authMiddleware,  deleteUsersCtrl)
userRoutes.get("/:id", fetchUserDetailsCtrl)




module.exports = userRoutes
