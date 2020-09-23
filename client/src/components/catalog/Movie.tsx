import React from "react"
import { useSelector } from "react-redux"

import { RootState } from "../../store/root/reducer"

import { MovieDetails } from "../../api/responses"
import Poster from "./Poster"
import { Link } from "react-router-dom"
import styled from "styled-components"
import ListAction from "./ListAction"

interface Props extends MovieDetails {}

export default function Movie({ id, poster_path, original_title }: Props) {
  const { _id, list } = useSelector(
    (state: RootState) => state.profiles.currentProfile!
  )
  const isListed = (list as MovieDetails[]).find(movie => movie.id === id)

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
