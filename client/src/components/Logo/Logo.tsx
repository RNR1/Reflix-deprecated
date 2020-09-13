import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Logo.module.css'

export default function Logo() {
	return (
		<Link to='/' className={classes.Logo}>
			REFLIX
		</Link>
	)
}
