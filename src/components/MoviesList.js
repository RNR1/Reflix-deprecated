import React, { Component } from "react"
import '../style/MoviesList.css'
import Movie from "./Movie"

class MoviesList extends Component {
	
	render() {
        return (
			<div id={this.props.list}>
				<h3>{this.props.title}</h3>
                <div className='list'>
					{this.props.list === 'search-results' && this.props.movies.length === 0 ? (
                        <h3>No Matching Results</h3>
                    ) :
                    this.props.movies.map(m => (
						<Movie
							key={m.id}
							info={m}
                            list={this.props.list}
							rentMovie={this.props.rentMovie}
                            returnMovie={this.props.returnMovie}
							clearSearch={this.props.clearSearch}
							displayInput={this.props.displayInput}
							toggleInput={this.props.toggleInput}
						/>
					))}
				</div>
			</div>
		)
	}
}

export default MoviesList
