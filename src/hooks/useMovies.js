import { useContext, useEffect, useCallback } from 'react'
import { MoviesContext } from '../context/movies'
import { Movies } from '../api/agent'

export default function useMovies() {
	const { movies, setMovies } = useContext(MoviesContext)
	const rentPrice = 3

	const fetchMovies = useCallback(
		() => Movies.list().then((movies) => setMovies(movies)),
		[setMovies]
	)

	useEffect(() => {
		fetchMovies()
	}, [fetchMovies])

	const getMovieDetails = (movieId) =>
		movies.find((movie) => movie._id.$oid === movieId)

	// const areRented = movies.some((m) => m.isRented)

	const cantAffordRent = (budget) => budget - rentPrice < 0

	const returnMovie = (movieId) => {
		const updatedMovies = movies
		// updatedMovies.find((m) => m.id === parseInt(movieId)).isRented = false
		setMovies([...updatedMovies])
		// setBudget(budget + rentPrice)
	}

	const rentMovie = (movieId) => {
		if (cantAffordRent()) {
			return alert('insufficient funds')
		}
		const updatedMovies = movies
		// updatedMovies.find((m) => m.id === parseInt(movieId)).isRented = true
		setMovies([...updatedMovies])
		// setBudget(budget - rentPrice)
	}

	return {
		movies,
		// budget,
		/* areRented, */ returnMovie,
		rentMovie,
		getMovieDetails
	}
}
