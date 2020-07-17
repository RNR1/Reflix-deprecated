import React from 'react'

import classes from './Layout.module.css'
import Logo from '../Logo/Logo'
import Navbar from '../Navbar/Navbar'
import Search from '../Search/Search'
import { useLocation } from 'react-router-dom'
import useSearch from '../../hooks/useSearch'
import useCurrentWidth from '../../hooks/useCurrentWidth'

export default function Layout({ children }) {
	const { pathname } = useLocation()
	const { displaySearch, search, searchValue, toggleSearch } = useSearch()
	const width = useCurrentWidth()
	const lg = width > 575
	const displayNavbar = (!displaySearch || lg) && pathname !== '/'

	return (
		<div className={classes.Layout}>
			<div className={classes.Header}>
				<Logo />
				{displayNavbar && <Navbar />}
				{pathname === '/catalog' && (
					<Search
						onChange={search}
						displaySearch={displaySearch}
						onClick={toggleSearch}
						value={searchValue}
					/>
				)}
			</div>
			<main className={classes.Main}>{children}</main>
		</div>
	)
}
