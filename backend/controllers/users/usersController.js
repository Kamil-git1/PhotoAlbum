const User = require("../../model/user/User")
const asyncHandler = require("express-async-handler")
const generateToken = require("../../config/token/generateToken")
const validateId = require("../utils/validateId")

const Collection = require("../../model/collection/Collection")
//--------------------------------------Register
const userRegisterCtrl = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email })
  if (userExists) throw new Error("User already exists")
  try {
    //Register user
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    res.json(user)
  } catch (error) {
    res.json(error)
  }
})

//Login
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const userFound = await User.findOne({ email })
  //Check if password is match
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      name: userFound?.name,
      email: userFound?.email,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
      isBlocked: userFound?.isBlocked,
    })
  } else {
    res.status(401)
    throw new Error("Invalid credentials")
  }
})

//Users
const fetchUsersCtrl = asyncHandler(async (req, res) => {
  const { isAdmin } = req.user
  if (isAdmin) {
    try {
      const users = await User.find({})
      res.json(users)
    } catch (error) {
      res.json(error)
    }
  } else {
    res.json("No access")
  }
})

//Delete user
const deleteUsersCtrl = asyncHandler(async (req, res) => {
  try {
    const user = await User.deleteMany({
      _id: { $in: req.params.id.split(",").filter((id) => id.length > 0) },
    }).then(() => {
      localStorage.clear()
      Collection.collection.drop()
    })
    // const collections = await User.findById(id).populate([
    //   {
    //     path: "collections",
    //     model: "Collection",
    //     populate: [
    //       {
    //         path: "items",
    //         model: "Item",
    //       },
    //       {
    //         path: "comments",
    //         model: "Comment",
    //       },
    //     ],
    //   },
    // ])
    res.json(user)
  } catch (error) {
    res.json("Error couldnt delete user")
  }
})

//user details
const fetchUserDetailsCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params
  //check if user id is valid
  validateId(id)
  try {
    const user = await User.findById(id)
    res.json(user)
  } catch (error) {
    res.json(error)
  }
})

//user profile

const userProfileCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateId(id)
  try {
    const user = await User.findById(id).populate([
      {
        path: "collections",
        model: "Collection",
        populate: [
          {
            path: "items",
            model: "Item",
          },
          {
            path: "comments",
            model: "Comment",
          },
        ],
      },
    ])
    res.json(user.collections)
  } catch (error) {
    res.json(error)
  }
})

//update profile
const updateUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.user

  validateId(id)
  const user = await User.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  )
})

//update password
const updateUserPasswordCtrl = asyncHandler(async (req, res) => {
  const { id } = req.user
  const { password } = req.body
  validateId(id)
  //Find the user by _id
  const user = await User.findOne({ id })

  if (password) {
    user.password = password
    const updatedUser = await user.save()
    res.json(updatedUser)
  } else {
    res.json(user)
  }
})

//block user

const blockUserCtrl = asyncHandler(async (req, res) => {
  const ids = req.body
  try {
    const user = await User.updateMany(
      { _id: { $in: ids } },
      { $set: { isBlocked: true } },
      { multi: true }
    )

    res.json(user)
  } catch (error) {
    res.json(error.message)
  }
})
const unBlockUserCtrl = asyncHandler(async (req, res) => {
  const ids = req.body
  try {
    const user = await User.updateMany(
      { _id: { $in: ids } },
      { $set: { isBlocked: false } },
      { multi: true }
    )

    res.json(user)
  } catch (error) {
    res.json(error.message)
  }
})
const addAdminCtrl = asyncHandler(async (req, res) => {
  const ids = req.body
  try {
    const user = await User.updateMany(
      { _id: { $in: ids } },
      { $set: { isAdmin: true } },
      { multi: true }
    )

    res.json(user)
  } catch (error) {
    res.json(error.message)
  }
})
const removeAdminCtrl = asyncHandler(async (req, res) => {
  const ids = req.body
  try {
    const user = await User.updateMany(
      { _id: { $in: ids } },
      { $set: { isAdmin: false } },
      { multi: true }
    )

    res.json(user)
  } catch (error) {
    res.json(error.message)
  }
})

module.exports = {
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
  removeAdminCtrl,
  addAdminCtrl,
}
