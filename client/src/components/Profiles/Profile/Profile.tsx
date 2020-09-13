import React from "react"

import classes from "./Profile.module.css"
import { useDispatch } from "react-redux"
import { selectProfile } from "../../../store/profiles/reducer"

interface Props {
  _id: { $oid: string }
  img: string
  name: string
}

export default function Profile({ _id, img, name }: Props) {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(selectProfile(_id.$oid))
  }

  return (
    <div className={classes.Profile} onClick={onClick}>
      <img className={classes.Img} src={img} alt={name} />
      <p className={classes.Name}>{name}</p>
    </div>
  )
}
