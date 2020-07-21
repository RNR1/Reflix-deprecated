import React, { useEffect, useState } from 'react'
import classes from '../style/MovieDetail.module.css'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner/Spinner'
import useDataFetch from '../hooks/useDataFetch'

export default function MovieDetailPage() {
	const [movie, setMovie] = useState()
	const { id } = useParams()
	const { fetchMovieData } = useDataFetch()

	useEffect(() => {
		fetchMovieData(id, setMovie)
	}, [id, movie, fetchMovieData])

	if (!movie) return <Spinner />
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
