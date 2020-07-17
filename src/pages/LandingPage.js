import React from 'react'
import classes from '../style/Landing.module.css'
import Profiles from '../components/Profiles/Profiles'

export default function LandingPage() {
	return (
		<div className={classes.Landing}>
			<h1 className={classes.Title}>Who's Watching?</h1>
			<Profiles />
		</div>
	)
}
