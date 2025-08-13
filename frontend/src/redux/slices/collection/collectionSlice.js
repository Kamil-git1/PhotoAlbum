import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl } from "../../../utils/baseURL"

const resetEditAction = createAction("collection/reset")
const resetDeleteAction = createAction("collection/delete-reset")
const resetCollectionAction = createAction("collection/created-reset")

//create
export const createCollectionAction = createAsyncThunk(
  "collection/create",
  async (collection, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    //http call
    const formData = new FormData()
    formData.append("name", collection?.name)
    formData.append("tags", collection?.tags)
    formData.append("imageLink", collection?.imageLink)

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/collection`,
        formData,
        config
      )

      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response.data)
    }
  }
)

//fetch all
export const fetchCollectionAction = createAsyncThunk(
  "collection/fetch",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/collection`)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
export const fetchCollectionItems = createAsyncThunk(
  "collection/fetchItems",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/collection/${id}`,
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

//Update
export const updateCollectionAction = createAsyncThunk(
  "collection/update",
  async (collection, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.put(
        `${baseUrl}/api/collection/${collection.id}`,
        collection,
        config
      )
      dispatch(resetEditAction())
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
export const deleteCollectionAction = createAsyncThunk(
  "collection/delete",
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
      const { data } = await axios.delete(
        `${baseUrl}/api/collection/${id}`,
        config
      )
      dispatch(resetDeleteAction())
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

export const searchCollection = createAsyncThunk(
  "collection/search",
  async (query, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/collection/search/${query}`
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

//-------------------------------slices
const collectionSlices = createSlice({
  name: "collection",
  initialState: {},
  extraReducers: (builder) => {
    //create
    builder.addCase(createCollectionAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(resetCollectionAction, (state, action) => {
      state.isCreated = true
    })
    builder.addCase(createCollectionAction.fulfilled, (state, action) => {
      state.collection = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(createCollectionAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action.payload.message
      state.serverErr = action.error.message
    })
    //fetch
    builder.addCase(fetchCollectionAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchCollectionAction.fulfilled, (state, action) => {
      const { arg } = action.meta
      switch (arg) {
        case "asc":
          state.collectionList = action?.payload.sort(
            (a, b) => a?.items?.length - b?.items?.length
          )
          break
        case "dsc":
          state.collectionList = action?.payload.sort(
            (a, b) => b?.items?.length - a?.items?.length
          )
          break
        default:
          state.collectionList = action?.payload.sort(
            (a, b) => a?.items?.length - b?.items?.length
          )
          break
      }
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(fetchCollectionAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
    //update
    builder.addCase(updateCollectionAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(resetEditAction, (state, action) => {
      state.isEdited = true
    })
    builder.addCase(updateCollectionAction.fulfilled, (state, action) => {
      state.updateCollection = action?.payload
      state.isEdited = false
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(updateCollectionAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
    //delete
    builder.addCase(deleteCollectionAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(resetDeleteAction, (state, action) => {
      state.isDeleted = true
    })
    builder.addCase(deleteCollectionAction.fulfilled, (state, action) => {
      state.deletedCollection = action?.payload
      state.isDeleted = false
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(deleteCollectionAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
    //fetch details
    builder.addCase(fetchCollectionItems.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchCollectionItems.fulfilled, (state, action) => {
      state.loading = false
      state.populatedItems = action?.payload
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(fetchCollectionItems.rejected, (state, action) => {
      state.loading = false
      state.populatedItems = undefined
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
    //search collections
    builder.addCase(searchCollection.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(searchCollection.fulfilled, (state, action) => {
      state.loading = false
      state.foundCollections = action?.payload
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(searchCollection.rejected, (state, action) => {
      state.loading = false
      state.foundCollections = undefined
      state.appErr = action?.payload?.message
      state.serverErr = action?.error.message
    })
  },
})

export default collectionSlices.reducer
