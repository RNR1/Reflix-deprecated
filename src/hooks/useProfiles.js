import { useContext, useCallback } from 'react'
import { ProfilesContext } from '../context/profiles'
import { Profiles } from '../api/agent'
import { RENT_PRICE } from '../config/consts'

export default function useProfiles() {
	const {
		profiles,
		setProfiles,
		currentProfile,
		setCurrentProfile
	} = useContext(ProfilesContext)

	const fetchProfiles = useCallback(
		() => Profiles.list().then(({ profiles }) => setProfiles(profiles)),
		[setProfiles]
	)

	const isProfile = (id) => profiles.findIndex((p) => p._id.$oid === id) !== -1

	const selectProfile = useCallback(
		(profileId) => {
			const profile = profiles.find((profile) => profile._id.$oid === profileId)
			setCurrentProfile(profile)
		},
		[setCurrentProfile, profiles]
	)

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
				await fetchProfiles()
				selectProfile(profiles.find((p) => p._id.$oid === profileId))
			} catch (error) {
				console.log(error.message)
			}
		},
		[currentProfile, cantAffordRent, fetchProfiles, selectProfile, profiles]
	)

	const isRented = (movieId) =>
		currentProfile.rentals.findIndex((m) => m._id.$oid === movieId) >= 0

	return {
		profiles,
		fetchProfiles,
		currentProfile,
		selectProfile,
		isProfile,
		isRented,
		rentalAction
	}
}
