import React from "react"
import styled from "styled-components"

import Profile from "./Profile"
import IProfile from "../../models/Profile"

interface Props {
  list: IProfile[]
}

export default function Profiles({ list }: Props) {
  return (
    <Container>
      {list.map(props => (
        <Profile key={props._id.$oid} {...props} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  margin-top: 10vh;
  animation: slide-in-bck-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`
