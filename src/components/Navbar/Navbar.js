import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Navbar.module.css'
import useProfiles from '../../hooks/useProfiles'

export default function Navbar() {
	const { currentProfile } = useProfiles()
	return (
		<div className={classes.MainLinks}>
			<Link className={classes.MainLink} to='/'>
				Home
			</Link>
			{currentProfile && (
				<Link
					className={classes.MainLink}
					to={`/catalog?profile=${currentProfile?._id.$oid}`}>
					Catalog
				</Link>
			)}
		</div>
	)
}
