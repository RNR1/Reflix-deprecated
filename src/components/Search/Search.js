import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import classes from './Search.module.css'

export default function Search({ displaySearch, onChange, onClick, value }) {
	const inputClasses = [classes.SearchInput]
	!displaySearch && inputClasses.push(classes.Hide)
	return (
		<div className={classes.SearchForm}>
			<FontAwesomeIcon
				className={classes.SearchIcon}
				icon={faSearch}
				onClick={onClick}
			/>
			<input
				type='textarea'
				name='search'
				className={inputClasses.join(' ')}
				autoFocus={displaySearch}
				placeholder='Search'
				onChange={onChange}
				value={value}
			/>
		</div>
	)
}
