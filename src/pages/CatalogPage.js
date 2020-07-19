import React, { useEffect } from 'react'

import classes from '../style/Catalog.module.css'
import Movies from '../components/Movies/Movies'
import useMovies from '../hooks/useMovies'
import useSearch from '../hooks/useSearch'
import useProfile from '../hooks/useProfiles'
import useQuery from '../hooks/useQuery'

export default function CatalogPage() {
	const { movies /*, areRented*/ } = useMovies()
	const { currentProfile, selectProfile } = useProfile()
	const { searchInProgress, searchResults } = useSearch()

	const query = useQuery()

	useEffect(() => {
		if (!currentProfile) selectProfile(query.get('profile'))
	}, [currentProfile, selectProfile, query])
	// console.log(currentProfile.budget)
	return (
		<div className={classes.Catalog}>
			<div className={classes.Budget}>Budget: ${currentProfile?.budget}</div>
			{searchInProgress() ? (
				<Movies
					movies={searchResults()}
					list='search-results'
					title='Search Results'
				/>
			) : (
				<>
					{/* {areRented && (
						<Movies
							movies={movies.filter((m) => m.isRented)}
							list='rented'
							title='Rented'
						/>
					)} */}
					<Movies movies={movies} title='Catalog' list='main-catalog' />
				</>
			)}
		</div>
	)
}
