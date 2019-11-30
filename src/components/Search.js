import React, { Component } from "react"

class Search extends Component {
	type = e => {
		const searchValue = e.target.value
		this.props.type(searchValue)
	}
	render() {
		return (
			<input
				type='text'
				name='search'
				id='search'
				placeholder='Search'
				value={this.props.searchValue}
				onChange={this.type}
			/>
		)
	}
}

export default Search
