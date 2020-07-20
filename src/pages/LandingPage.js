import React, { useEffect } from 'react'
import classes from '../style/Landing.module.css'
import Profiles from '../components/Profiles/Profiles'
import useProfiles from '../hooks/useProfiles'

export default function LandingPage() {
	const { fetchProfiles, profiles } = useProfiles()

	useEffect(() => {
		if (!profiles.length) fetchProfiles()
	}, [profiles, fetchProfiles])

	return (
		<div className={classes.Landing}>
			<h1 className={classes.Title}>Who's Watching?</h1>
			<Profiles />
		</div>
	)
}
