import React, { createContext, useState } from 'react'
export const SearchContext = createContext()

export default function SearchContextProvider({ children }) {
	const [searchValue, setSearchValue] = useState('')
	const [displaySearch, setDisplaySearch] = useState(false)

	return (
		<SearchContext.Provider
			value={{ searchValue, setSearchValue, displaySearch, setDisplaySearch }}>
			{children}
		</SearchContext.Provider>
	)
}
