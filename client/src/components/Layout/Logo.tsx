import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { selectProfile } from "store/profiles/reducer"

export default function Logo() {
  const dispatch = useDispatch()
  return (
    <BrandLink onClick={() => dispatch(selectProfile(null))} to="/">
      REFLIX
    </BrandLink>
  )
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
