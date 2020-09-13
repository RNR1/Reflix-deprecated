import React, { ChangeEvent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import classes from "./Search.module.css"

interface Props {
  displaySearch: boolean
  onChange: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  value: string
}

export default function Search({
  displaySearch,
  onChange,
  onClick,
  value,
}: Props) {
  const inputClasses = [classes.SearchInput]
  !displaySearch && inputClasses.push(classes.Hide)
  return (
    <div className={classes.SearchForm}>
      <FontAwesomeIcon
        className={classes.SearchIcon}
        icon={faSearch}
        onClick={onClick}
      />
      <input
        type="search"
        name="search"
        className={inputClasses.join(" ")}
        placeholder="Search"
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
