import React, { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"

import classes from "./Movie.module.css"

import { RootState } from "../../../store/root/reducer"
import { rent } from "../../../store/profiles/reducer"
import { RENT_PRICE } from "../../../config/consts"
import { MovieDetails } from "../../../api/responses"
import Poster from "./Poster"

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

  const cantAffordRent = useCallback(
    () => currentProfile!.budget - RENT_PRICE < 0,
    [currentProfile]
  )
  const rentalAction = useCallback(
    async (action: string, movie: number) => {
      try {
        const profile = currentProfile!._id.$oid
        if (action === "rent" && cantAffordRent())
          throw new Error("Insufficient funds")
        dispatch(rent({ action, profile, movie }))
      } catch (error) {
        console.error(error.message)
      }
    },
    [currentProfile, cantAffordRent, dispatch]
  )

  return (
    <div className={[classes.Movie, "slide-in-bck-center"].join(" ")}>
      <Poster {...{ id, poster_path, original_title }} />
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
