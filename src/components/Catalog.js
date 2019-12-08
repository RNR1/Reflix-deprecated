import React, { Component } from "react"
import "../style/Catalog.css"
import Search from "./Search"
import MoviesList from "./MoviesList"

class Catalog extends Component {
	constructor() {
		super()
		this.state = {
			searchValue: ""
		}
	}
	type = searchValue => {
		this.setState({ searchValue })
	}

	isRented = () => this.props.movies.some(m => m.isRented)

	searchInProgress = () => this.state.searchValue.length > 0

	RentedMovies = () => {
		if (this.isRented()) {
			return (
				<MoviesList
					movies={this.props.movies.filter(m => m.isRented)}
					list='rented'
					title='Rented'
					rentMovie={this.props.rentMovie}
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
				returnMovie={this.props.returnMovie}
			/>
		)
	}

	SearchResults = () => {
		const movies = this.props.movies.filter(m =>
			m.title.toLowerCase().includes(this.state.searchValue.toLowerCase())
		)
		return (
			<MoviesList
				movies={movies}
				list='search-results'
				title='Search Results'
				rentMovie={this.props.rentMovie}
				returnMovie={this.props.returnMovie}
			/>
		)
	}

	render() {
		return (
			<div id='catalog' >
				<Search searchValue={this.state.searchValue} type={this.type} displayInput={this.props.displayInput} toggleInput={this.props.toggleInput} />
				<div id='budget' >Budget: ${this.props.budget}</div>
				{this.searchInProgress() ? (
					<div id='results' className="slide-in-bck-center">{this.SearchResults()}</div>
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
