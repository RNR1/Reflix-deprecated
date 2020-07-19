import React from 'react'
import classes from './Movies.module.css'
import Movie from './Movie/Movie'

export default function Movies({ list, title, movies }) {
	return (
		<div className={classes[list]}>
			<h3 className={classes.Title}>{title}</h3>
			<div className={classes.List}>
				{list === 'search-results' && movies.length === 0 ? (
					<h3 className={classes.NoMatches}>No Matching Results</h3>
				) : (
					movies.length &&
					movies.map((movie) => (
						<Movie key={movie._id.$oid} list={list} {...movie} />
					))
				)}
			</div>
		</div>
	)
}
