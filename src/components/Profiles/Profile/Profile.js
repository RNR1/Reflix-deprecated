import React from 'react'
import { useHistory } from 'react-router-dom'

import classes from './Profile.module.css'
import useProfiles from '../../../hooks/useProfiles'

export default function Profile({ _id, img, name }) {
	const history = useHistory()
	const { selectProfile } = useProfiles()

	const onClick = () => {
		selectProfile(_id.$oid)
		history.push(`/catalog?profile=${_id.$oid}`)
	}

	return (
		<div className={classes.Profile} onClick={onClick}>
			<img className={classes.Img} src={img} alt={name} />
			<p className={classes.Name}>{name}</p>
		</div>
	)
}
