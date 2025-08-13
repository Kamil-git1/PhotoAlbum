import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl } from "../../../utils/baseURL"

//Create Item action

//action to redirect
const resetItem = createAction("category/reset")

const resetItemDelete = createAction("item/delete")

//Create
export const createItemAction = createAsyncThunk(
  "item/created",
  async (item, { rejectWithValue, getState, dispatch }) => {
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
      const formData = new FormData()
      formData.append("title", item?.title)
      formData.append("description", item?.description)
      formData.append("collectionId", item?.collectionId)
      formData.append("itemImg", item?.itemImg)
      formData.append("userId", item?.userId)

      const { data } = await axios.post(
        `${baseUrl}/api/items`,
        formData,
        config
      )

      dispatch(resetItem())

      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)

//Delete
export const deleteItemAction = createAsyncThunk(
  "item/delete",
  async (deleteString, { rejectWithValue, getState, dispatch }) => {
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
        `${baseUrl}/api/items/${deleteString}`,
        config
      )
      //dispatch
      dispatch(resetItemDelete())
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)

//Add Likes to post
export const toggleAddLikesToItem = createAsyncThunk(
  "item/like",
  async (itemId, { rejectWithValue, getState, dispatch }) => {
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
        `http://localhost:5000/api/items/like`,
        { itemId },
        config
      )

      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)

//slice
const itemSlice = createSlice({
  name: "item",
  initialState: {},
  extraReducers: (builder) => {
    //create item
    builder.addCase(createItemAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(resetItem, (state, action) => {
      state.isCreated = true
    })
    builder.addCase(createItemAction.fulfilled, (state, action) => {
      state.itemCreated = action?.payload
      state.loading = false
      state.isCreated = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(createItemAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })

    //Delete item
    builder.addCase(deleteItemAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(resetItemDelete, (state, action) => {
      state.isDeleted = true
    })
    builder.addCase(deleteItemAction.fulfilled, (state, action) => {
      state.itemUpdated = action?.payload
      state.isDeleted = false
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(deleteItemAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })

    //addliketoitem
    builder.addCase(toggleAddLikesToItem.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(toggleAddLikesToItem.fulfilled, (state, action) => {
      state.likes = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(toggleAddLikesToItem.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
  },
})

export default itemSlice.reducer
