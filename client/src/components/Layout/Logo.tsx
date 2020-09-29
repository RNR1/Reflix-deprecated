import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

export default function Logo() {
  return <BrandLink to="/">REFLIX</BrandLink>
}

const BrandLink = styled(Link)`
  align-self: flex-end;
  margin: 0 10px;
  line-height: 1;
  color: #e50615;
  -webkit-text-stroke: medium;
  font-size: 5.5vmax;

  @media (min-width: 1150px) {
    font-size: 3vmax;
  }
`
