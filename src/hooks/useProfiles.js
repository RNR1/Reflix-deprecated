import { useContext, useCallback } from 'react'
import { ProfilesContext } from '../context/profiles'
import { Profiles } from '../api/agent'
import { RENT_PRICE } from '../config/consts'
import useQuery from './useQuery'
import { useHistory } from 'react-router-dom'

export default function useProfiles() {
	const {
		profiles,
		setProfiles,
		currentProfile,
		setCurrentProfile
	} = useContext(ProfilesContext)
	const history = useHistory()
	const query = useQuery()

	const fetchProfiles = useCallback(
		() =>
			Profiles.list()
				.then(({ profiles }) => setProfiles(profiles))
				.catch((error) => console.log(error.message)),
		[setProfiles]
	)

	const fetchProfile = useCallback(
		(id) =>
			Profiles.profile(id)
				.then((profile) => setCurrentProfile(profile))
				.catch((error) => {
					throw error
				}),
		[setCurrentProfile]
	)

	const selectProfile = useCallback(
		async (profileId) => {
			if (profileId === null) return setCurrentProfile(null)
			const profile = profiles.find((profile) => profile._id.$oid === profileId)
			if (!profile)
				try {
					await fetchProfile(profileId)
				} catch (error) {
					throw new Error(error.message)
				}
			else setCurrentProfile(profile)
		},
		[setCurrentProfile, profiles, fetchProfile]
	)

	const renderCurrentProfile = useCallback(async () => {
		const profile = query.get('profile')
		if (!profile) return history.replace('/')
		try {
			await selectProfile(profile)
		} catch (error) {
			history.replace('/')
		}
	}, [selectProfile, history, query])

	const cantAffordRent = useCallback(
		() => currentProfile?.budget - RENT_PRICE < 0,
		[currentProfile]
	)

	const rentalAction = useCallback(
		async (action, movieId) => {
			try {
				const profileId = currentProfile._id.$oid
				if (action === 'rent' && cantAffordRent())
					throw new Error('Insufficient funds')
				await Profiles.rent(action, profileId, movieId)
				fetchProfile(profileId)
			} catch (error) {
				console.log(error.message)
			}
		},
		[currentProfile, cantAffordRent, fetchProfile]
	)

	const isRented = (movieId) =>
		currentProfile.rentals.findIndex((m) => m._id.$oid === movieId) >= 0

	return {
		profiles,
		fetchProfiles,
		currentProfile,
		selectProfile,
		renderCurrentProfile,
		isRented,
		rentalAction
	}
}
