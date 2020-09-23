import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import styled from "styled-components"
import Movies from "../components/catalog/Movies"
import useSearch from "../hooks/useSearch"
import Spinner from "../components/Layout/Spinner"
import { RootState } from "../store/root/reducer"
import { fetchMoviesList } from "../store/movies/reducer"
import useQueryParams from "../hooks/useQueryParams"
import { fetchProfileById } from "../store/profiles/reducer"
import { useHistory } from "react-router-dom"
import { MovieDetails } from "../api/responses"

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
    dispatch(fetchMoviesList())
  }, [dispatch, profileId, currentProfile])

  if (error) history.replace("/404")
  if (!currentProfile) return <Spinner />
  return (
    <Container>
      {searchInProgress() ? (
        <Movies list={searchResults} title="Search Results" isSearching />
      ) : (
        <>
          {currentProfile?.list?.length > 0 && (
            <Movies
              list={currentProfile.list as MovieDetails[]}
              title="My List"
            />
          )}
          {Object.entries(movies).map(([category, movies]) => (
            <Movies key={category} list={movies} title={category} />
          ))}
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin: 80px auto;
  animation: slide-in-bck-center 0.3s;
`
