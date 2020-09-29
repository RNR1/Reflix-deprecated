import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import styled from "styled-components"

import Spinner from "components/layout/Spinner"
import useQueryParams from "hooks/useQueryParams"
import { fetchMovieById } from "store/movies/reducer"
import { fetchProfileById } from "store/profiles/reducer"
import type { RootState } from "store/root/reducer"

export default function MovieDetailPage() {
  const dispatch = useDispatch()
  const history = useHistory()

  const { id } = useParams<{ id: string }>()
  const {
    movies: { currentMovie: movie, error },
    profiles: { currentProfile },
  } = useSelector((state: RootState) => state)
  const query = useQueryParams()
  const profileId = query.get("profile")!

  useEffect(() => {
    if (!currentProfile) dispatch(fetchProfileById(profileId))
  }, [dispatch, currentProfile, profileId])

  useEffect(() => {
    dispatch(fetchMovieById(+id))
  }, [dispatch, id])

  if (error) history.replace("/404")
  if (!movie || !currentProfile) return <Spinner />
  return (
    <Container>
      <h3>
        {movie.original_title} ({new Date(movie.release_date).getFullYear()})
      </h3>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`
        }
        alt={movie.original_title}
      />
      <p className="description">{movie.overview}</p>
    </Container>
  )
}

const Container = styled.div`
  display: block;
  height: 100%;
  text-align: center;
  margin-top: 80px;
  animation: slide-in-bck-center 0.5s;
  color: white;

  & img {
    margin-top: 10px;
    height: 40vh;
  }

  & .description {
    margin: 15px auto;
    max-width: 700px;
    color: white;
    font-size: 1em;
    @media (max-width: 768px) {
      font-size: 0.9em;
    }
  }
`
