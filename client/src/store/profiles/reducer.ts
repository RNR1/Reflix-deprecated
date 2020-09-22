import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Profile from "../../models/Profile"
import { Profiles } from "../../api/agent"

export interface ProfilesState {
  profiles: Profile[]
  currentProfile: Profile | null
  error: string | null
}

const initialState: ProfilesState = {
  profiles: [],
  currentProfile: null,
  error: null,
}

export const fetchProfilesList = createAsyncThunk(
  "profiles/fetchProfilesList",
  async () => await Profiles.list()
)

export const fetchProfileById = createAsyncThunk(
  "profiles/fetchProfileById",
  async (id: string) => {
    try {
      return await Profiles.profile(id)
    } catch (error) {
      throw error
    }
  }
)

export const rent = createAsyncThunk(
  "profiles/rent",
  async (
    {
      action,
      profile,
      movie,
    }: {
      action: string
      profile: string
      movie: number
    },
    { dispatch }
  ) => {
    await Profiles.rent(action, profile, movie)
    dispatch(fetchProfileById(profile))
  }
)

const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    selectProfile(state, action) {
      state.currentProfile =
        state.profiles.find(p => p._id.$oid === action.payload) || null
    },
  },
  extraReducers: {
    [fetchProfilesList.fulfilled.toString()]: (state, action) => {
      state.profiles = action.payload
      state.error = null
    },
    [fetchProfileById.fulfilled.toString()]: (state, action) => {
      state.currentProfile = action.payload
      state.error = null
    },
    [fetchProfileById.rejected.toString()]: (state, action) => {
      state.currentProfile = null
      if (action.error.message.includes("404"))
        state.error = "Profile not found"
      else state.error = action.error.message
    },
    [rent.rejected.toString()]: (state, action) => {
      state.error = action.error.message
    },
  },
})

const { actions, reducer } = profilesSlice
export const { selectProfile } = actions
export default reducer
