import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"

import classes from "../style/MovieDetail.module.css"
import Spinner from "../components/Layout/Spinner"
import { RootState } from "../store/root/reducer"
import { fetchMovieById } from "../store/movies/reducer"
import { fetchProfileById } from "../store/profiles/reducer"
import useQueryParams from "../hooks/useQueryParams"

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
    dispatch(fetchMovieById(id))
  }, [dispatch, id])

  if (error) history.replace("/404")
  if (!movie || !currentProfile) return <Spinner />
  return (
    <div className={classes.MovieDetail}>
      <h3 className={classes.Title}>
        {movie.original_title} ({new Date(movie.release_date).getFullYear()})
      </h3>
      <img
        className={classes.Img}
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`
        }
        alt={movie.original_title}
      />
      <p className={classes.Description}>{movie.overview}</p>
    </div>
  )
}
