import React from "react"
import { MovieDetails } from "../../../api/responses"
import classes from "./Movie.module.css"

interface Props extends Partial<MovieDetails> {}

export default function Poster({ id, poster_path, original_title }: Props) {
  return (
    <img
      className={classes.Img}
      src={
        poster_path
          ? `https://image.tmdb.org/t/p/w500/${poster_path}`
          : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`
      }
      alt={original_title}
    />
  )
}
