import { useEffect, useCallback, ChangeEvent, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import type { RootState } from "store/root/reducer"
import {
  searchMovie,
  setDisplaySearch,
  setSearchValue,
} from "store/movies/reducer"

export default function useSearch() {
  const dispatch = useDispatch()
  const { searchResults, searchValue, displaySearch } = useSelector(
    (state: RootState) => state.movies
  )

  const debouncedQuery = useDebounce(searchValue, 300)

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchValue(value))

  const searchInProgress = () => debouncedQuery.length > 0

  const toggleSearch = () => {
    dispatch(setDisplaySearch(!displaySearch))
    if (displaySearch) clearSearch()
  }

  const clearSearch = useCallback(() => dispatch(setSearchValue("")), [
    dispatch,
  ])

  useEffect(() => {
    if (debouncedQuery) dispatch(searchMovie(debouncedQuery))
  }, [debouncedQuery, dispatch])

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

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  )

  return debouncedValue
}
