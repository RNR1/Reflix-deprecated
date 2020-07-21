import React from 'react'

import classes from './Profiles.module.css'
import Profile from './Profile/Profile'
import useProfiles from '../../hooks/useProfiles'
import Spinner from '../Spinner/Spinner'

export default function Profiles() {
	const { profiles } = useProfiles()

	return (
		<div className={classes.Profiles}>
			{profiles.length ? (
				profiles.map((profile) => (
					<Profile key={profile._id.$oid} {...profile} />
				))
			) : (
				<Spinner />
			)}
		</div>
	)
}