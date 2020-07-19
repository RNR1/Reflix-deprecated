import React from 'react'
import MoviesContextProvider from './movies'
import SearchContextProvider from './search'
import ProfilesContextProvider from './profiles'

export default function RootContextProvider({ children }) {
	return (
		<ProfilesContextProvider>
			<MoviesContextProvider>
				<SearchContextProvider>{children}</SearchContextProvider>
			</MoviesContextProvider>
		</ProfilesContextProvider>
	)
}
