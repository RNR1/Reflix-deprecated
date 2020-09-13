import React from "react"
import classes from "./Movies.module.css"
import MovieItem from "./Movie/Movie"
import Spinner from "../Spinner/Spinner"
import Movie from "../../models/Movie"
import { useSelector } from "react-redux"
import { RootState } from "../../store/root/reducer"

function NoMatches() {
  return <h3 className={classes.NoMatches}>No Matching Results</h3>
}

interface Props {
  title: string
  movies: Movie[]
  isSearching?: boolean
}

export default function Movies({ title, movies, isSearching }: Props) {
  const { currentProfile } = useSelector((state: RootState) => state.profiles)

  return (
    <>
      <h3 className={classes.Title}>{title}</h3>
      <div className={classes.List}>
        {isSearching && !movies.length ? (
          <NoMatches />
        ) : movies.length ? (
          movies.map(movie => (
            <MovieItem
              key={movie._id.$oid}
              isRented={
                currentProfile!.rentals.findIndex(
                  m => m._id.$oid === movie._id.$oid
                ) >= 0
              }
              profile={currentProfile!._id.$oid}
              {...movie}
            />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </>
  )
}
