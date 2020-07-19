import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Profile.module.css'
import useProfile from '../../../hooks/useProfiles'

export default function Profile({ _id, img, name }) {
	const { selectProfile } = useProfile()
	return (
		<Link
			to={`/catalog?profile=${_id.$oid}`}
			onClick={() => selectProfile(_id.$oid)}>
			<img src={img} className={classes.Profile} alt={name} />
			<p className={classes.Name}>{name}</p>
		</Link>
	)
}
