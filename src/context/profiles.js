import React, { createContext, useState } from 'react'
export const ProfilesContext = createContext()

export default function ProfilesContextProvider({ children }) {
	const [profiles, setProfiles] = useState([])
	const [currentProfile, setCurrentProfile] = useState()

	return (
		<ProfilesContext.Provider
			value={{ profiles, setProfiles, currentProfile, setCurrentProfile }}>
			{children}
		</ProfilesContext.Provider>
	)
}
