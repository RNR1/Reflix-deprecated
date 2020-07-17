import React from 'react'
import MoviesContextProvider from './movies'
import SearchContextProvider from './search'

export default function RootContextProvider({ children }) {
	return (
		<MoviesContextProvider>
			<SearchContextProvider>{children}</SearchContextProvider>
		</MoviesContextProvider>
	)
}
