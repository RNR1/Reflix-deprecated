import React from "react"

import Movie from "./Movie"
import Spinner from "../Layout/Spinner"

import { MovieDetails } from "../../api/responses"
import styled from "styled-components"

const NoMatches = () => <h3 className="no-matches">No Matching Results</h3>

interface Props {
  title: string
  list: MovieDetails[]
  isSearching?: boolean
}

export default function Movies({ title, list, isSearching }: Props) {
  return (
    <Container>
      <h3 className="title">{title}</h3>
      <div className="list">
        {isSearching && !list.length ? (
          <NoMatches />
        ) : list.length ? (
          list.map(movie => <Movie key={movie.id} {...movie} />)
        ) : (
          <Spinner />
        )}
      </div>
    </Container>
  )
}

const Container = styled.section`
  & .title {
    font-size: 1.5em;
    margin-left: 10px;
    color: white;
  }

  & .no-matches {
    font-size: 1.3em;
    margin-left: 10px;
    color: rgb(246, 240, 240);
    opacity: 0.5;
  }

  & .list {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }
`
