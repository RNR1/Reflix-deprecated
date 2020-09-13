import React, { useEffect } from "react"

import classes from "./Profiles.module.css"
import Profile from "./Profile/Profile"
import Spinner from "../Spinner/Spinner"
import { useSelector } from "react-redux"
import { RootState } from "../../store/root/reducer"
import { useHistory } from "react-router-dom"

export default function Profiles() {
  const history = useHistory()
  const { profiles, currentProfile } = useSelector(
    (state: RootState) => state.profiles
  )

  useEffect(() => {
    if (currentProfile)
      history.push(`/catalog?profile=${currentProfile._id.$oid}`)
  }, [currentProfile, history])

  return (
    <div className={classes.Profiles}>
      {profiles.length ? (
        profiles.map(props => <Profile key={props._id.$oid} {...props} />)
      ) : (
        <Spinner />
      )}
    </div>
  )
}
