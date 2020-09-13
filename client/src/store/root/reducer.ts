import { combineReducers } from "@reduxjs/toolkit"
import profiles from "../profiles/reducer"
import movies from "../movies/reducer"

const rootReducer = combineReducers({
  profiles,
  movies,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
