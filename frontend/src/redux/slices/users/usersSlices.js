import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "../../../utils/baseURL"

//----------------------------------------register action

const resetDeleteAction = createAction("collection/delete-reset")

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      //http call
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
        user,
        config
      )
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
//fetch by user id
export const fetchUsersCollection = createAsyncThunk(
  "users/collections",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users

    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    //http call
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/users/profile/${userAuth?._id}`,
        config
      )

      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
//fetch users for admin list
export const fetchUsersList = createAsyncThunk(
  "users/userList",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users

    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    //http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/users/`, config)

      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
//TODO
export const loginUserWithGithub = createAsyncThunk(
  "user/login-github",
  async (x, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/auth/github/getUser`)
       localStorage.setItem("userInfo", JSON.stringify(data))
       console.log(data)
       return data
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
//-----------------------------------login
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        userData,
        config
      )
      localStorage.setItem("userInfo", JSON.stringify(data))

      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

//logout action
export const logoutAction = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {

    try {
      localStorage.removeItem("userInfo")
     
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)
//Block User
export const blockUserAction = createAsyncThunk(
  "users/block",
  async (gridItemsIds, { rejectWithValue, getState, dispatch }) => {
    //get user token

    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/block-user`,
        gridItemsIds,
        config
      )

      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)

//unBlock User
export const unBlockUserAction = createAsyncThunk(
  "users/unblock",
  async (gridItemsIds, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/unblock-user`,
        gridItemsIds,
        config
      )
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)

//Delete
export const deleteUserAction = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token

    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    try {
      //http call

      const { data } = await axios.delete(
        `${baseUrl}/api/users/delete/${id}`,
        config
      )
      dispatch(resetDeleteAction())
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)
//add admin
export const addAdminUserAction = createAsyncThunk(
  "users/addAdmin",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token

    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/add-admin`,
        id,
        config
      )

      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)
//add admin
export const removeAdminUserAction = createAsyncThunk(
  "users/removeAdmin",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token

    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users/remove-admin`,
        id,
        config
      )

      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)
//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false
      state.registered = action?.payload
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message
      state.serverErr = action.error.message
      state.loading = false
    })
    //login with github
    builder.addCase(loginUserWithGithub.pending, (state, action) => {
      state.loading = true
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(loginUserWithGithub.fulfilled, (state, action) => {
      state.userAuth = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(loginUserWithGithub.rejected, (state, action) => {
      state.appErr = action?.payload?.message
      state.serverErr = action.error.message
      state.loading = false
    })
    //logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = false
    })
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth = undefined
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.appErr = action.payload.message
      state.serverErr = action.error.message
      state.loading = false
    })
    //fetch users collections
    builder.addCase(fetchUsersCollection.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchUsersCollection.fulfilled, (state, action) => {
      const { arg } = action.meta
      switch (arg) {
        case "asc":
          state.userCollections = action?.payload?.sort(
            (a, b) => a?.items?.length - b?.items?.length
          )
          break
        case "dsc":
          state.userCollections = action?.payload?.sort(
            (a, b) => b?.items?.length - a?.items?.length
          )
          break
        default:
          break
      }
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(fetchUsersCollection.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
    //
    builder.addCase(fetchUsersList.pending, (state, action) => {
      state.loading = true
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(fetchUsersList.fulfilled, (state, action) => {
      state.loading = false
      state.usersList = action?.payload
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(fetchUsersList.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
    //Block user
    builder.addCase(blockUserAction.pending, (state, action) => {
      state.loading = true
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(blockUserAction.fulfilled, (state, action) => {
      state.loading = false
      state.block = action?.payload
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(blockUserAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
    //unBlock user
    builder.addCase(unBlockUserAction.pending, (state, action) => {
      state.loading = true
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(unBlockUserAction.fulfilled, (state, action) => {
      state.loading = false
      state.unblock = action?.payload
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(unBlockUserAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
    //delete user

    builder.addCase(deleteUserAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(resetDeleteAction, (state, action) => {
      state.isDeleted = true
    })
    builder.addCase(deleteUserAction.fulfilled, (state, action) => {
      state.deletedUser = action?.payload
      state.isDeleted = false
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(deleteUserAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
    //add admin
    builder.addCase(addAdminUserAction.pending, (state, action) => {
      state.loading = true
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(addAdminUserAction.fulfilled, (state, action) => {
      state.loading = false
      state.addedAdmin = action?.payload
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(addAdminUserAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
    //remove admin
    builder.addCase(removeAdminUserAction.pending, (state, action) => {
      state.loading = true
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(removeAdminUserAction.fulfilled, (state, action) => {
      state.loading = false
      state.removedAdmin = action?.payload
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(removeAdminUserAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
  },
})

export default usersSlices.reducer
