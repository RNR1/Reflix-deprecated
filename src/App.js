import React from 'react'

import Layout from './components/Layout/Layout'
import Routes from './routes/Routes'
import RootContextProvider from './context/RootContextProvider'

export default function App() {
	return (
		<RootContextProvider>
			<Layout>
				<Routes />
			</Layout>
		</RootContextProvider>
	)
}
