import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

import { listMovie } from "store/profiles/reducer"
import type { RootState } from "store/root/reducer"

interface Props {
  action: "add" | "remove"
  movie: number
}

export default function ListAction({ action, movie }: Props) {
  const dispatch = useDispatch()
  const { _id } = useSelector(
    (state: RootState) => state.profiles.currentProfile!
  )

  const handleAction = async () => {
    const profile = _id.$oid
    dispatch(listMovie({ action, profile, movie }))
  }

  return (
    <Icon icon={action === "add" ? faPlus : faMinus} onClick={handleAction} />
  )
}

const Icon = styled(FontAwesomeIcon)`
  color: white;
  position: relative;
  bottom: 175px;
  right: 27px;
  background-color: rgba(128, 128, 128, 0.7);
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;

  &:active {
    font-size: 80%;
    transition: 0.3s ease-in-out;
  }

  @media (max-width: 414px) {
    bottom: 220px;
    right: 30px;
    padding: 5px;
  }
`
