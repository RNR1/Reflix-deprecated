import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import classes from './Movie.module.css'
import useProfiles from '../../../hooks/useProfiles'

export default function Movie({ _id, img, title, isRented }) {
	const { rentalAction } = useProfiles()
	return (
		<div className={[classes.Movie, 'slide-in-bck-center'].join(' ')}>
			<Link to={`/movies/${_id.$oid}`}>
				<img className={classes.Img} src={img} alt={title} />
			</Link>
			{isRented ? (
				<FontAwesomeIcon
					icon={faMinus}
					className={classes.Icon}
					onClick={() => rentalAction('return', _id.$oid)}
				/>
			) : (
				<FontAwesomeIcon
					icon={faPlus}
					className={classes.Icon}
					onClick={() => rentalAction('rent', _id.$oid)}
				/>
			)}
		</div>
	)
}
