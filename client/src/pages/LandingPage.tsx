import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import styled from "styled-components"

import Profiles from "../components/landing/Profiles"
import Spinner from "../components/layout/Spinner"
import { fetchProfilesList } from "../store/profiles/reducer"
import { RootState } from "../store/root/reducer"

export default function LandingPage() {
  const dispatch = useDispatch()
  const history = useHistory()

  const { profiles, currentProfile } = useSelector(
    (state: RootState) => state.profiles
  )

  useEffect(() => {
    dispatch(fetchProfilesList())
  }, [dispatch])

  useEffect(() => {
    if (currentProfile)
      history.push(`/catalog?profile=${currentProfile._id.$oid}`)
  }, [currentProfile, history])

  return (
    <Container>
      {profiles.length ? (
        <>
          <h1>Who's Watching?</h1>
          <Profiles list={profiles} />
        </>
      ) : (
        <Spinner />
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 80px;
  text-align: center;
  animation: slide-in-bck-center 0.4s;

  & h1 {
    font-size: 6vh;
    color: white;
    position: relative;
    top: 20px;
  }
`
