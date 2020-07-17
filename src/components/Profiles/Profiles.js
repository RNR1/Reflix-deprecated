import React from 'react'

import classes from './Profiles.module.css'
import profiles from '../../data/users.json'
import Profile from './Profile/Profile'

export default function Profiles() {
	return (
		<div className={classes.Profiles}>
			{profiles.map((p, i) => (
				<Profile key={i} name={p.name} img={p.img} />
			))}
		</div>
	)
}
