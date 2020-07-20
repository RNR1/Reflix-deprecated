import React from 'react'
import MoviesContextProvider from './movies'
import SearchContextProvider from './search'
import ProfilesContextProvider from './profiles'

export default function RootContextProvider({ children }) {
	return (
		<MoviesContextProvider>
			<ProfilesContextProvider>
				<SearchContextProvider>{children}</SearchContextProvider>
			</ProfilesContextProvider>
		</MoviesContextProvider>
	)
}
