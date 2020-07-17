import { useContext } from 'react'
import { MoviesContext } from '../context/movies'

export default function useMovies() {
	const { movies, setMovies, budget, setBudget } = useContext(MoviesContext)
	const rentPrice = 3

	const getMovieDetails = (movieId) =>
		movies.find((m) => m.id === parseInt(movieId))

	const areRented = movies.some((m) => m.isRented)

	const cantAffordRent = () => budget - rentPrice < 0

	const returnMovie = (movieId) => {
		const updatedMovies = movies
		updatedMovies.find((m) => m.id === parseInt(movieId)).isRented = false
		setMovies([...updatedMovies])
		setBudget(budget + rentPrice)
	}

	const rentMovie = (movieId) => {
		if (cantAffordRent()) {
			return alert('insufficient funds')
		}
		const updatedMovies = movies
		updatedMovies.find((m) => m.id === parseInt(movieId)).isRented = true
		setMovies([...updatedMovies])
		setBudget(budget - rentPrice)
	}

	return { movies, budget, areRented, returnMovie, rentMovie, getMovieDetails }
}
