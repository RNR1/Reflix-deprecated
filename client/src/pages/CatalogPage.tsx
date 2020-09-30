import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"

import { Carousel, Movies } from "components/catalog"
import Spinner from "components/layout/Spinner"
import useCurrentWidth from "hooks/useCurrentWidth"
import useSearch from "hooks/useSearch"
import useQueryParams from "hooks/useQueryParams"
import type { RootState } from "store/root/reducer"
import { fetchMoviesList } from "store/movies/reducer"
import { fetchProfileById } from "store/profiles/reducer"
import type { MovieDetails } from "api/responses"

export default function CatalogPage() {
  const { currentProfile, movies, error } = useSelector((state: RootState) => ({
    currentProfile: state.profiles.currentProfile,
    movies: state.movies.movies,
    error: state.profiles.error,
  }))

  const query = useQueryParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const moviesPerSection = useMoviesPerSection()
  const profileId = query.get("profile")!

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
            <Carousel
              moviesPerSection={moviesPerSection}
              list={currentProfile.list as MovieDetails[]}
              title="My List"
            />
          )}
          {Object.entries(movies).map(([category, movies]) => (
            <Carousel
              key={category}
              moviesPerSection={moviesPerSection}
              list={movies}
              title={category}
            />
          ))}
        </>
      )}
    </Container>
  )
}

function useMoviesPerSection(): number {
  const width = useCurrentWidth()
  const [xs, sm, md, lg] = [414, 540, 768, 1024]

  if (width > lg) return 7
  if (width > md) return 5
  if (width > sm) return 4
  if (width > xs) return 2
  return 1
}

const Container = styled.div`
  width: 100%;
  margin: 80px auto;
  animation: slide-in-bck-center 0.3s;
`
