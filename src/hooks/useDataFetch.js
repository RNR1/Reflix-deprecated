import { useCallback, useState } from 'react'
import useProfiles from './useProfiles'
import useMovies from './useMovies'

export default function useDataFetch() {
	const [loading, setLoading] = useState(false)
	const {
		profiles,
		fetchProfiles,
		currentProfile,
		renderCurrentProfile,
		selectProfile
	} = useProfiles()
	const { movies, fetchMovies, fetchMovie, getMovieDetails } = useMovies()

	const fetchCatalogData = useCallback(async () => {
		setLoading(true)
		if (!currentProfile) await renderCurrentProfile()
		if (!movies.length) await fetchMovies()
		setLoading(false)
	}, [fetchMovies, movies, currentProfile, renderCurrentProfile])

	const fetchMovieData = useCallback(
		async (id, set) => {
			setLoading(true)
			if (!currentProfile) await renderCurrentProfile()
			let movie
			if (movies.length) movie = getMovieDetails(id)
			else movie = await fetchMovie(id)
			set(movie)
			setLoading(false)
		},
		[
			currentProfile,
			fetchMovie,
			getMovieDetails,
			renderCurrentProfile,
			movies.length
		]
	)

	const fetchLandingData = useCallback(() => {
		setLoading(true)
		if (currentProfile) selectProfile(null)
		if (!profiles.length) fetchProfiles()
		setLoading(false)
	}, [currentProfile, fetchProfiles, profiles.length, selectProfile])

	return {
		loading,
		currentProfile,
		movies,
		fetchCatalogData,
		fetchMovieData,
		fetchLandingData
	}
}
