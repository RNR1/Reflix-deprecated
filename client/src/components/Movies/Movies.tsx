import React from "react"
import classes from "./Movies.module.css"
import MovieItem from "./Movie/Movie"
import Spinner from "../Spinner/Spinner"

import { MovieDetails } from "../../api/responses"

function NoMatches() {
  return <h3 className={classes.NoMatches}>No Matching Results</h3>
}

interface Props {
  title: string
  movies: MovieDetails[]
  isSearching?: boolean
}

export default function Movies({ title, movies, isSearching }: Props) {
  return (
    <>
      <h3 className={classes.Title}>{title}</h3>
      <div className={classes.List}>
        {isSearching && !movies.length ? (
          <NoMatches />
        ) : movies.length ? (
          movies.map(movie => (
            <MovieItem key={movie.id} isRented={false} {...movie} />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </>
  )
}
