import React from "react"
import styled from "styled-components"
import type { MovieDetails } from "api/responses"

export default function Poster({
  poster_path,
  original_title,
}: Partial<MovieDetails>) {
  return (
    <Image
      src={
        poster_path
          ? `https://image.tmdb.org/t/p/w500/${poster_path}`
          : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`
      }
      alt={original_title}
    />
  )
}

const Image = styled.img`
  border-radius: 5px;
  width: 150px;
  height: 200px;
  border: 1px solid black;

  &:hover {
    border: 1px solid white;
  }

  @media (max-width: 414px) {
    margin-top: 10px;
    width: 200px;
    height: 250px;
  }
`
