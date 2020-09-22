import React from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import classes from "./Navbar.module.css"
import { RootState } from "../../store/root/reducer"
import { selectProfile } from "../../store/profiles/reducer"

export default function Navbar() {
  const { currentProfile } = useSelector((state: RootState) => state.profiles)
  const dispatch = useDispatch()

  return (
    <div className={classes.MainLinks}>
      <Link
        className={classes.MainLink}
        onClick={() => dispatch(selectProfile(null))}
        to="/"
      >
        Home
      </Link>
      {currentProfile && (
        <Link
          className={classes.MainLink}
          to={`/catalog?profile=${currentProfile._id.$oid}`}
        >
          Catalog
        </Link>
      )}
    </div>
  )
}
