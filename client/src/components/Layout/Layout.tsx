import React, { PropsWithChildren } from "react"

import Logo from "./Logo"
import Navbar from "./Navbar"
import Search from "../Search/Search"
import { useLocation } from "react-router-dom"
import useSearch from "../../hooks/useSearch"
import useCurrentWidth from "../../hooks/useCurrentWidth"
import styled from "styled-components"
import { GlobalStyle } from "./GlobalStyle"

export default function Layout({ children }: PropsWithChildren<{}>) {
  const { pathname } = useLocation()
  const { displaySearch } = useSearch()
  const width = useCurrentWidth()
  const lg = width > 575
  const displayNavbar = (!displaySearch || lg) && pathname !== "/"

  return (
    <Container>
      <GlobalStyle />
      <Header>
        <Logo />
        {displayNavbar && <Navbar />}
        {pathname === "/catalog" && <Search />}
      </Header>
      <main>{children}</main>
    </Container>
  )
}

const Container = styled.div`
  background-color: #141414;
  height: 100vh;

  main {
    margin: 0 auto;
    max-width: 1320px;
    overflow: hidden;
  }
`

const Header = styled.div`
  margin: 0 auto;
  display: flex;
  position: fixed;
  background-color: #0f0f0f;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
  height: 50px;
  padding: 5px;
  z-index: 1;
`
