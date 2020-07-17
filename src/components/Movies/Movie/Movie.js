import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import classes from './Movie.module.css'
import useMovies from '../../../hooks/useMovies'

export default function Movie({ id, img, title, isRented }) {
	const { returnMovie, rentMovie } = useMovies()
	return (
		<div className={(classes.Movie, 'slide-in-bck-center')}>
			<Link to={`/movies/${id}`}>
				<img className={classes.Img} src={img} alt={title} />
			</Link>
			{isRented ? (
				<FontAwesomeIcon
					icon={faMinus}
					className={classes.Icon}
					onClick={() => returnMovie(id)}
				/>
			) : (
				<FontAwesomeIcon
					icon={faPlus}
					className={classes.Icon}
					onClick={() => rentMovie(id)}
				/>
			)}
		</div>
	)
}
