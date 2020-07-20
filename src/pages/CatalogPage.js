import React, { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import classes from '../style/Catalog.module.css'
import Movies from '../components/Movies/Movies'
import useMovies from '../hooks/useMovies'
import useSearch from '../hooks/useSearch'
import useProfiles from '../hooks/useProfiles'
import useQuery from '../hooks/useQuery'
import Spinner from '../components/Spinner/Spinner'

export default function CatalogPage() {
	const [loading, setLoading] = useState(false)
	const { movies, fetchMovies } = useMovies()
	const {
		profiles,
		fetchProfiles,
		currentProfile,
		selectProfile
	} = useProfiles()
	const { searchInProgress, searchResults } = useSearch()
	const history = useHistory()
	const query = useQuery()

	const renderPageData = useCallback(async () => {
		setLoading(true)
		if (!profiles.length) await fetchProfiles()
		if (!movies.length) await fetchMovies()
		setLoading(false)
	}, [fetchMovies, fetchProfiles, movies, profiles])

	const renderCurrentProfile = useCallback(() => {
		if (!currentProfile) {
			const profile = query.get('profile')
			if (!profile) history.replace('/')
			selectProfile(profile)
		}
	}, [currentProfile, selectProfile, history, query])

	useEffect(() => {
		renderPageData().then(() => {
			renderCurrentProfile()
		})
	}, [renderPageData, renderCurrentProfile])

	const catalogClasses = [classes.Slide, classes.Catalog]

	if (loading) return <Spinner />
	return (
		<div className={catalogClasses.join(' ')}>
			{currentProfile && (
				<div className={classes.Budget}>Budget: ${currentProfile.budget}</div>
			)}
			{searchInProgress() ? (
				<Movies
					movies={searchResults()}
					list='search-results'
					title='Search Results'
				/>
			) : (
				<>
					{currentProfile?.rentals?.length > 0 && (
						<Movies
							movies={currentProfile.rentals}
							list='rented'
							title='Rented'
						/>
					)}
					{movies?.length > 0 && (
						<Movies movies={movies} title='Catalog' list='main-catalog' />
					)}
				</>
			)}
		</div>
	)
}
