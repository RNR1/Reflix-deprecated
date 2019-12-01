import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"


class Search extends Component {
	constructor() {
		super()
		this.state = {
			displayInput: false
		}
	}

	type = e => {
		const searchValue = e.target.value
		this.props.type(searchValue)
	}

	toggleInput = () => {
		this.setState({displayInput: !this.state.displayInput})
	}

	render() {
		return (
			<div id="search-form">
				<FontAwesomeIcon className="search-icon slide-in-bck-center" icon={faSearch} onClick={this.toggleInput} />
				<input
					type='textarea'
					name='search'
					className="scale-up-hor-left animate"
					placeholder='Search'
					style={{display: this.state.displayInput ? "inline-block" : "none"}}
					value={this.props.searchValue}
					onChange={this.type}		
				/>
			</div>
		)
	}
}

export default Search
