import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

import useSearch from "hooks/useSearch"

export default function Search() {
  const { displaySearch, handleChange, searchValue, toggleSearch } = useSearch()
  return (
    <Container>
      <Icon icon={faSearch} onClick={toggleSearch} />
      <Input
        type="search"
        name="search"
        inputMode="search"
        autoFocus={false}
        displaySearch={displaySearch}
        placeholder="Search"
        onChange={handleChange}
        value={searchValue}
      />
    </Container>
  )
}

const Container = styled.div`
  flex: 1.5;
  display: flex;
  justify-content: flex-end;
  align-self: center;
  align-items: center;
  margin-right: 20px;

  @media (max-width: 768px) {
    align-self: flex-end;
  }
  @media (max-width: 415px) {
    margin-right: 20px;
  }
`

const Icon = styled(FontAwesomeIcon)`
  color: white;
  position: relative;
  margin-right: 10px;
  cursor: pointer;
  animation: slide-in-bck-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  transition-duration: 1s;
`

const Input = styled.input<{ displaySearch: boolean }>`
  height: 40px;
  width: ${({ displaySearch }) => (displaySearch ? "20vw" : "0")};
  border: ${({ displaySearch }) => (displaySearch ? "1px solid white" : "0px")};
  visibility: ${({ displaySearch }) => (displaySearch ? "visible" : "hidden")};
  border-radius: 5px;
  padding-left: 15px;
  background-color: #141414;
  position: relative;
  color: blanchedalmond;
  animation: slide-in-bck-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  transition: all 0.3s;

  @media (max-width: 768px) {
    height: 30px;
    width: ${({ displaySearch }) => (displaySearch ? "30vw" : "0")};
  }
  @media (max-width: 415px) {
    height: 30px;
    width: ${({ displaySearch }) => (displaySearch ? "160px" : "0")};
  }
`
