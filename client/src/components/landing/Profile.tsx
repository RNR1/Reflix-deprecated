import React from "react"

import { useDispatch } from "react-redux"
import { fetchProfileById } from "../../store/profiles/reducer"
import IProfile from "../../models/Profile"
import styled from "styled-components"

export default function Profile({ _id, img, name }: IProfile) {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(fetchProfileById(_id.$oid))
  }

  return (
    <Container onClick={onClick}>
      <img src={img} alt={name} />
      <p className="name">{name}</p>
    </Container>
  )
}

const Container = styled.div`
  & img {
    height: 120px;
    width: 120px;
    margin: 0.625rem;
    border-radius: 5px;
    border: 3px solid #141414;
  }

  & img:hover {
    border: 3px solid white;
    transition: border 0.2s;
    cursor: pointer;
  }

  & .name {
    color: white;
    display: block;
    position: relative;
    font-size: 1.5rem;
    margin: 0;
    text-decoration: none;
  }
`
