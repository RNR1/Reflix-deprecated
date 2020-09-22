import React, { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"

import classes from "./Movie.module.css"

import { RootState } from "../../../store/root/reducer"
import { listMovie } from "../../../store/profiles/reducer"

import { MovieDetails } from "../../../api/responses"
import Poster from "./Poster"
import { Link } from "react-router-dom"

interface Props extends MovieDetails {
  isListed: boolean
}

export default function Movie({
  id,
  poster_path,
  original_title,
  isListed,
}: Props) {
  const dispatch = useDispatch()
  const { currentProfile } = useSelector((state: RootState) => state.profiles)

  const listAction = useCallback(
    async (action: string, movie: number) => {
      try {
        const profile = currentProfile!._id.$oid
        dispatch(listMovie({ action, profile, movie }))
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
      {isListed ? (
        <FontAwesomeIcon
          icon={faMinus}
          className={classes.Icon}
          onClick={() => listAction("remove", id)}
        />
      ) : (
        <FontAwesomeIcon
          icon={faPlus}
          className={classes.Icon}
          onClick={() => listAction("add", id)}
        />
      )}
    </div>
  )
}
