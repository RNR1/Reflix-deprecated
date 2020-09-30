import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { ListAction, Poster } from "."
import type { RootState } from "store/root/reducer"
import type { MovieDetails } from "api/responses"

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
  padding: 0 2px;
  transition: 250ms all;

  &:hover {
    margin: 0 40px;
    transform: scale(1.2);
    z-index: 1;
  }
  animation: slide-in-bck-center 0.3s;
`
