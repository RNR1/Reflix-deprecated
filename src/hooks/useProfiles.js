import { useContext, useEffect, useCallback } from 'react'
import { ProfilesContext } from '../context/profiles'
import { Profiles } from '../api/agent'

export default function useProfile() {
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

	const selectProfile = (profileId) =>
		setCurrentProfile(
			profiles.find((profile) => profile._id.$oid === profileId)
		)

	useEffect(() => {
		fetchProfiles()
	}, [fetchProfiles])

	return { profiles, fetchProfiles, currentProfile, selectProfile }
}
