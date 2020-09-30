import React, { useState } from "react"
import styled from "styled-components"

import type { MovieDetails } from "api/responses"
import { Movie } from "."

interface Props {
  list: MovieDetails[]
  moviesPerSection: number
  title: string
}

export default function Carousel({ moviesPerSection, list, title }: Props) {
  const { loadPrev, currentSection, loadNext } = useSection(
    moviesPerSection,
    list
  )
  return (
    <>
      <Title>{title}</Title>
      <Wrapper>
        <Section moviesPerSection={moviesPerSection}>
          <button onClick={loadPrev}>{"<"}</button>
          {currentSection.map(props => (
            <Movie key={props.id} {...props} />
          ))}
          <button onClick={loadNext}>{">"}</button>
        </Section>
      </Wrapper>
    </>
  )
}

function useSection(moviesPerSection: number, list: MovieDetails[]) {
  const [section, setSection] = useState(1)
  const indexOfLastMovie = section * moviesPerSection
  const indexOfFirstMovie = indexOfLastMovie - moviesPerSection
  const currentSection = list.slice(indexOfFirstMovie, indexOfLastMovie)
  const numOfSections = Math.round(list.length / currentSection.length)
  const loadNext = () =>
    setSection(prev => (prev + 1 > numOfSections ? 1 : prev + 1))
  const loadPrev = () =>
    setSection(prev => (prev - 1 <= 0 ? numOfSections : prev - 1))

  return { currentSection, loadPrev, loadNext }
}

const Title = styled.h3`
  font-size: 1.5em;
  margin-left: 10px;
  color: white;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100%);
`

const Section = styled.section<{ moviesPerSection: number }>`
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(
    ${({ moviesPerSection }) => moviesPerSection},
    auto
  );
  justify-items: center;
  margin: 20px 0;

  button {
    position: absolute;
    color: #fff;
    border: none;
    font-size: 6em;
    background: rgb(0, 0, 0);
    width: 80px;
    padding: 20px;
    text-align: center;

    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }

    &:first-child {
      top: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(
        -90deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 100%
      );
    }
    &:last-child {
      top: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 100%
      );
    }
  }
`
