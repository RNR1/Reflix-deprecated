import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import Movie from "../../models/Movie"
import { Movies } from "../../api/agent"

export interface MoviesState {
  movies: Movie[]
  searchValue: string
  searchResults: Movie[]
  displaySearch: boolean
  currentMovie: Movie | null
  error: string | null
}

const initialState: MoviesState = {
  movies: [],
  searchValue: "",
  searchResults: [],
  displaySearch: false,
  currentMovie: null,
  error: null,
}

export const fetchMoviesList = createAsyncThunk(
  "movies/fetchMoviesList",
  async () => {
    return await Movies.list()
  }
)

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (id: string) => {
    return await Movies.movie(id)
  }
)

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    selectMovie(state, action) {
      state.currentMovie = action.payload
    },
    search(state, action) {
      state.searchValue = action.payload
      state.searchResults = state.movies.filter(m =>
        m.title.toLowerCase().includes(action.payload.toLowerCase())
      )
    },
    setDisplaySearch(state, action: { payload: boolean }) {
      state.displaySearch = action.payload
    },
  },
  extraReducers: {
    [fetchMoviesList.fulfilled.toString()]: (state, action) => {
      state.movies = [...action.payload]
      state.error = null
    },
    [fetchMovieById.fulfilled.toString()]: (state, action) => {
      state.currentMovie = { ...action.payload }
      state.error = null
    },
    [fetchMovieById.rejected.toString()]: (state, action) => {
      state.currentMovie = null
      if (action.error.message.includes("404")) state.error = "Movie not found"
      else state.error = action.error.message
    },
  },
})

const { actions, reducer } = moviesSlice
export const { selectMovie, search, setDisplaySearch } = actions
export default reducer
