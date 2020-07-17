import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Navbar.module.css'

export default function Navbar() {
	return (
		<div className={classes.MainLinks}>
			<Link className={classes.MainLink} to='/'>
				Home
			</Link>
			<Link className={classes.MainLink} to='/catalog'>
				Catalog
			</Link>
		</div>
	)
}
