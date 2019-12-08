import React, { Component } from 'react'
import '../style/Catalog.css'
import Search from './Search'
import MoviesList from './MoviesList'

class Catalog extends Component {
	searchInProgress = () => this.props.searchInProgress()

	isRented = () => this.props.movies.some(m => m.isRented)

	RentedMovies = () => {
		if (this.isRented()) {
			return (
				<MoviesList
					movies={this.props.movies.filter(m => m.isRented)}
					list='rented'
					title='Rented'
					rentMovie={this.props.rentMovie}
					toggleInput={this.props.toggleInput}
					returnMovie={this.props.returnMovie}
				/>
			)
		}
	}

	MainCatalog = () => {
		return (
			<MoviesList
				movies={this.props.movies}
				title='Catalog'
				list='main-catalog'
				rentMovie={this.props.rentMovie}
				toggleInput={this.props.toggleInput}
				returnMovie={this.props.returnMovie}
			/>
		)
	}

	getSearchResults = () => this.props.searchResults()

	SearchResults = () => {
		const movies = this.getSearchResults()
		return (
			<MoviesList
				movies={movies}
				list='search-results'
				title='Search Results'
				rentMovie={this.props.rentMovie}
				returnMovie={this.props.returnMovie}
				toggleInput={this.props.toggleInput}
				clearSearch={this.props.clearSearch}
			/>
		)
	}

	render() {
		return (
			<div id='catalog'>
				<Search
					searchValue={this.props.searchValue}
					type={this.props.type}
					displayInput={this.props.displayInput}
					toggleInput={this.props.toggleInput}
				/>
				<div id='budget'>Budget: ${this.props.budget}</div>
				{this.searchInProgress() ? (
					<div id='results' className='slide-in-bck-center'>
						{this.SearchResults()}
					</div>
				) : (
					<div id='results'>
						{this.RentedMovies()}
						{this.MainCatalog()}
					</div>
				)}
			</div>
		)
	}
}

export default Catalog
