import React from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"

import type { RootState } from "store/root/reducer"
import { selectProfile } from "store/profiles/reducer"

export default function Navbar() {
  const { currentProfile } = useSelector((state: RootState) => state.profiles)
  const dispatch = useDispatch()

  return (
    <Links>
      <Link onClick={() => dispatch(selectProfile(null))} to="/">
        Profiles
      </Link>
      {currentProfile && (
        <Link to={`/catalog?profile=${currentProfile._id.$oid}`}>Catalog</Link>
      )}
    </Links>
  )
}

const Links = styled.div`
  & a {
    color: white;
    line-height: 1;
    margin: 0 0 0 10px;
    text-decoration: none;
    font-size: 2.5vh;
  }
`
