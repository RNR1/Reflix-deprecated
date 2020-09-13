import { useEffect, useCallback, ChangeEvent } from "react"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../store/root/reducer"
import { search, setDisplaySearch } from "../store/movies/reducer"

export default function useSearch() {
  const dispatch = useDispatch()
  const { searchResults, searchValue, displaySearch } = useSelector(
    (state: RootState) => state.movies
  )

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    dispatch(search(value))

  const searchInProgress = () => searchValue.length > 0

  const toggleSearch = () => {
    dispatch(setDisplaySearch(!displaySearch))
    if (displaySearch) clearSearch()
  }

  const clearSearch = useCallback(() => dispatch(search("")), [dispatch])

  useEffect(() => {
    return () => {
      clearSearch()
      dispatch(setDisplaySearch(false))
    }
  }, [clearSearch, dispatch])

  return {
    clearSearch,
    displaySearch,
    handleChange,
    searchInProgress,
    searchResults,
    searchValue,
    toggleSearch,
  }
}
