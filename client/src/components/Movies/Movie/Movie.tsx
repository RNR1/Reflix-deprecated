import React, { useCallback } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import classes from "./Movie.module.css"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../store/root/reducer"
import { rent } from "../../../store/profiles/reducer"
import { RENT_PRICE } from "../../../config/consts"

interface Props {
  _id: { $oid: string }
  img: string
  title: string
  isRented: boolean
  profile: string
}

export default function Movie({ _id, img, title, isRented, profile }: Props) {
  const dispatch = useDispatch()
  const { currentProfile } = useSelector((state: RootState) => state.profiles)

  const cantAffordRent = useCallback(
    () => currentProfile!.budget - RENT_PRICE < 0,
    [currentProfile]
  )
  const rentalAction = useCallback(
    async (action: string, movie: string) => {
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
      <Link to={`/movies/${_id.$oid}?profile=${profile}`}>
        <img className={classes.Img} src={img} alt={title} />
      </Link>
      {isRented ? (
        <FontAwesomeIcon
          icon={faMinus}
          className={classes.Icon}
          onClick={() => rentalAction("return", _id.$oid)}
        />
      ) : (
        <FontAwesomeIcon
          icon={faPlus}
          className={classes.Icon}
          onClick={() => rentalAction("rent", _id.$oid)}
        />
      )}
    </div>
  )
}
