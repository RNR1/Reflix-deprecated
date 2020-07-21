import { useContext, useCallback } from 'react'
import { MoviesContext } from '../context/movies'
import { Movies } from '../api/agent'
import { useHistory } from 'react-router-dom'

export default function useMovies() {
	const { movies, setMovies } = useContext(MoviesContext)
	const history = useHistory()
	const fetchMovies = useCallback(async () => {
		try {
			const movies = await Movies.list()
			setMovies(movies)
		} catch (error) {
			throw error
		}
	}, [setMovies])

	const fetchMovie = async (id) => {
		try {
			return await Movies.movie(id)
		} catch (error) {
			history.replace('/404')
		}
	}

	const getMovieDetails = (movieId) =>
		movies.find((movie) => movie._id.$oid === movieId)

	return {
		movies,
		fetchMovies,
		fetchMovie,
		getMovieDetails
	}
}
