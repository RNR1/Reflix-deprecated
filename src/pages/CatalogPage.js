import React, { useEffect } from 'react'

import classes from '../style/Catalog.module.css'
import Movies from '../components/Movies/Movies'
import useMovies from '../hooks/useMovies'
import useSearch from '../hooks/useSearch'

export default function CatalogPage() {
	const { movies, areRented, budget } = useMovies()
	const { searchInProgress, searchResults, clearSearch } = useSearch()

	useEffect(() => {
		return () => {
			clearSearch()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={classes.Catalog}>
			<div className={classes.Budget}>Budget: ${budget}</div>
			{searchInProgress() ? (
				<Movies
					movies={searchResults()}
					list='search-results'
					title='Search Results'
				/>
			) : (
				<>
					{areRented && (
						<Movies
							movies={movies.filter((m) => m.isRented)}
							list='rented'
							title='Rented'
						/>
					)}
					<Movies movies={movies} title='Catalog' list='main-catalog' />
				</>
			)}
		</div>
	)
}
