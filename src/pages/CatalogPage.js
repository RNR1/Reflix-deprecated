import React, { useEffect } from 'react'

import classes from '../style/Catalog.module.css'
import Movies from '../components/Movies/Movies'
import useSearch from '../hooks/useSearch'
import Spinner from '../components/Spinner/Spinner'
import useDataFetch from '../hooks/useDataFetch'

export default function CatalogPage() {
	const { searchInProgress, searchResults } = useSearch()
	const { loading, movies, currentProfile, fetchCatalogData } = useDataFetch()

	useEffect(() => {
		fetchCatalogData()
	}, [fetchCatalogData])

	const catalogClasses = [classes.Slide, classes.Catalog]
	if (loading || !currentProfile) return <Spinner />
	return (
		<div className={catalogClasses.join(' ')}>
			{currentProfile && (
				<div className={classes.Budget}>Budget: ${currentProfile.budget}</div>
			)}
			{searchInProgress() ? (
				<Movies movies={searchResults()} title='Search Results' isSearching />
			) : (
				<>
					{currentProfile?.rentals?.length > 0 && (
						<Movies movies={currentProfile.rentals} title='Rented' />
					)}
					{movies?.length > 0 && <Movies movies={movies} title='Catalog' />}
				</>
			)}
		</div>
	)
}
