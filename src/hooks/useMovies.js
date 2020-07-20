import { useContext, useCallback } from 'react'
import { MoviesContext } from '../context/movies'
import { Movies } from '../api/agent'

export default function useMovies() {
	const { movies, setMovies } = useContext(MoviesContext)

	const fetchMovies = useCallback(async () => {
		try {
			const movies = await Movies.list()
			setMovies(movies)
		} catch (error) {
			console.log(error)
		}
	}, [setMovies])

	const getMovieDetails = (movieId) =>
		movies.find((movie) => movie._id.$oid === movieId)

	return {
		movies,
		fetchMovies,
		getMovieDetails
	}
}
