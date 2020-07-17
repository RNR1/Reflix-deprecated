import React, { useEffect, useState } from 'react'
import classes from '../style/MovieDetail.module.css'
import { useRouteMatch } from 'react-router-dom'
import useMovies from '../hooks/useMovies'

export default function MovieDetailPage() {
	const [movie, setMovie] = useState()
	const {
		params: { id }
	} = useRouteMatch()
	const { getMovieDetails } = useMovies()

	useEffect(() => {
		setMovie(getMovieDetails(id))
	}, [getMovieDetails, id])

	if (!movie) return null
	return (
		<div className={classes.MovieDetail}>
			<h3 className={classes.Title}>
				{movie.title} ({movie.year})
			</h3>
			<img className={classes.Img} src={movie.img} alt={movie.title} />
			<p className={classes.Description}>{movie.description}</p>
		</div>
	)
}
