import { combineReducers } from "@reduxjs/toolkit"
import profiles from "store/profiles/reducer"
import movies from "store/movies/reducer"

const rootReducer = combineReducers({
  profiles,
  movies,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
