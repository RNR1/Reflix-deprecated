import React from 'react'
import classes from './Movies.module.css'
import Movie from './Movie/Movie'
import Spinner from '../Spinner/Spinner'
import useProfiles from '../../hooks/useProfiles'

function NoMatches() {
	return <h3 className={classes.NoMatches}>No Matching Results</h3>
}

export default function Movies({ title, movies, isSearching }) {
	const { currentProfile } = useProfiles()
	return (
		<>
			<h3 className={classes.Title}>{title}</h3>
			<div className={classes.List}>
				{isSearching && !movies.length ? (
					<NoMatches />
				) : movies.length ? (
					movies.map((movie) => (
						<Movie
							key={movie._id.$oid}
							isRented={
								currentProfile?.rentals.findIndex(
									(m) => m._id.$oid === movie._id.$oid
								) >= 0
							}
							profile={currentProfile?._id.$oid}
							{...movie}
						/>
					))
				) : (
					<Spinner />
				)}
			</div>
		</>
	)
}
