import React from "react"
import { useSelector } from "react-redux"

import { RootState } from "../../store/root/reducer"

import { MovieDetails } from "../../api/responses"
import Poster from "./Poster"
import { Link } from "react-router-dom"
import styled from "styled-components"
import ListAction from "./ListAction"

interface Props extends MovieDetails {
  isListed: boolean
}

export default function Movie({
  isListed,
  id,
  poster_path,
  original_title,
}: Props) {
  const { _id } = useSelector(
    (state: RootState) => state.profiles.currentProfile!
  )

  return (
    <Container>
      <Link to={`/movies/${id}?profile=${_id.$oid}`}>
        <Poster {...{ id, poster_path, original_title }} />
      </Link>
      <ListAction movie={id} action={isListed ? "remove" : "add"} />
    </Container>
  )
}

const Container = styled.div`
  padding: 5px;
  animation: slide-in-bck-center 0.3s;
`
