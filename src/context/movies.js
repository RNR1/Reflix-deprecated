import React, { createContext, useState } from 'react'
import moviesData from '../data/movies.json'
export const MoviesContext = createContext()

export default function MoviesContextProvider({ children }) {
	const [movies, setMovies] = useState(moviesData)
	const [budget, setBudget] = useState(10)

	return (
		<MoviesContext.Provider value={{ movies, setMovies, budget, setBudget }}>
			{children}
		</MoviesContext.Provider>
	)
}
