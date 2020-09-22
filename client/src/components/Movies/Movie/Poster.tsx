import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { MovieDetails } from "../../../api/responses"
import { RootState } from "../../../store/root/reducer"
import classes from "./Movie.module.css"

interface Props extends Partial<MovieDetails> {}

export default function Poster({ id, poster_path, original_title }: Props) {
  const { _id } = useSelector(
    (state: RootState) => state.profiles.currentProfile!
  )
  return (
    <Link to={`/movies/${id}?profile=${_id.$oid}`}>
      <img
        className={classes.Img}
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={original_title}
      />
    </Link>
  )
}
