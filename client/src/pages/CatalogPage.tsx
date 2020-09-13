import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import classes from "../style/Catalog.module.css"
import Movies from "../components/Movies/Movies"
import useSearch from "../hooks/useSearch"
import Spinner from "../components/Spinner/Spinner"
import { RootState } from "../store/root/reducer"
import { fetchMoviesList } from "../store/movies/reducer"
import useQueryParams from "../hooks/useQueryParams"
import { fetchProfileById } from "../store/profiles/reducer"
import { useHistory } from "react-router-dom"

export default function CatalogPage() {
  const { currentProfile, movies, error } = useSelector((state: RootState) => ({
    currentProfile: state.profiles.currentProfile,
    movies: state.movies.movies,
    error: state.profiles.error,
  }))

  const query = useQueryParams()
  const profileId = query.get("profile")!
  const dispatch = useDispatch()
  const history = useHistory()

  const { searchInProgress, searchResults } = useSearch()

  useEffect(() => {
    if (!currentProfile) dispatch(fetchProfileById(profileId))
    if (!movies.length) dispatch(fetchMoviesList())
  }, [dispatch, movies, profileId, currentProfile])

  const catalogClasses = [classes.Slide, classes.Catalog]
  if (error) history.replace("/404")
  if (!currentProfile) return <Spinner />
  return (
    <div className={catalogClasses.join(" ")}>
      {currentProfile && (
        <div className={classes.Budget}>Budget: ${currentProfile.budget}</div>
      )}
      {searchInProgress() ? (
        <Movies movies={searchResults} title="Search Results" isSearching />
      ) : (
        <>
          {currentProfile?.rentals?.length > 0 && (
            <Movies movies={currentProfile.rentals} title="Rented" />
          )}
          {movies?.length > 0 && <Movies movies={movies} title="Catalog" />}
        </>
      )}
    </div>
  )
}
