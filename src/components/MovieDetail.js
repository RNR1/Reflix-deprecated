import React, { Component } from "react"
import "../style/MovieDetail.css"

class MovieDetail extends Component {
	render() {
		const movie = this.props.movie
		return (
			<div id='movie-detail'>
				<h3>
					{movie.title} ({movie.year})
				</h3>
				<img src={movie.img} alt={movie.title} />
				<p>{movie.descrShort}</p>
			</div>
		)
	}
}

export default MovieDetail
