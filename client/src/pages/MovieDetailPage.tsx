import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"

import classes from "../style/MovieDetail.module.css"
import Spinner from "../components/Spinner/Spinner"
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
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.original_title}
      />
      <p className={classes.Description}>{movie.overview}</p>
    </div>
  )
}
