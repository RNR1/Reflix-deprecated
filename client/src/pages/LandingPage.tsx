import React, { useEffect } from "react"
import classes from "../style/Landing.module.css"
import Profiles from "../components/Profiles/Profiles"

import { useDispatch } from "react-redux"
import { fetchProfilesList } from "../store/profiles/reducer"

export default function LandingPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProfilesList())
  }, [dispatch])

  return (
    <div className={classes.Landing}>
      <h1 className={classes.Title}>Who's Watching?</h1>
      <Profiles />
    </div>
  )
}
