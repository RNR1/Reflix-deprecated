import React, { useEffect } from 'react'
import classes from '../style/Landing.module.css'
import Profiles from '../components/Profiles/Profiles'
import useDataFetch from '../hooks/useDataFetch'

export default function LandingPage() {
	const { fetchLandingData } = useDataFetch()

	useEffect(() => {
		fetchLandingData()
	}, [fetchLandingData])

	return (
		<div className={classes.Landing}>
			<h1 className={classes.Title}>Who's Watching?</h1>
			<Profiles />
		</div>
	)
}
