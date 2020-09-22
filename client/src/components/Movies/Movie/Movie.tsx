import React, { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"

import classes from "./Movie.module.css"

import { RootState } from "../../../store/root/reducer"
import { rent } from "../../../store/profiles/reducer"

import { MovieDetails } from "../../../api/responses"
import Poster from "./Poster"
import { Link } from "react-router-dom"

interface Props extends MovieDetails {
  isRented: boolean
}

export default function Movie({
  id,
  poster_path,
  original_title,
  isRented,
}: Props) {
  const dispatch = useDispatch()
  const { currentProfile } = useSelector((state: RootState) => state.profiles)

  const rentalAction = useCallback(
    async (action: string, movie: number) => {
      try {
        const profile = currentProfile!._id.$oid
        dispatch(rent({ action, profile, movie }))
      } catch (error) {
        console.error(error.message)
      }
    },
    [currentProfile, dispatch]
  )

  return (
    <div className={[classes.Movie, "slide-in-bck-center"].join(" ")}>
      <Link to={`/movies/${id}?profile=${currentProfile?._id?.$oid}`}>
        <Poster {...{ id, poster_path, original_title }} />
      </Link>
      {isRented ? (
        <FontAwesomeIcon
          icon={faMinus}
          className={classes.Icon}
          onClick={() => rentalAction("return", id)}
        />
      ) : (
        <FontAwesomeIcon
          icon={faPlus}
          className={classes.Icon}
          onClick={() => rentalAction("rent", id)}
        />
      )}
    </div>
  )
}
