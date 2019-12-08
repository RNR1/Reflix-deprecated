import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"


class Search extends Component {

	type = e => {
		const searchValue = e.target.value
		this.props.type(searchValue)
	}

	toggleInput = () => {
		this.props.toggleInput()
	}

	render() {
		return (
			<div id="search-form">
				<FontAwesomeIcon className="search-icon slide-in-bck-center" icon={faSearch} onClick={this.toggleInput} />
				<input
					type='textarea'
					name='search'
					className={this.props.displayInput ? "" : "hide"}
					autoFocus={this.props.displayInput}
					placeholder='Search'
					value={this.props.searchValue}
					onChange={this.type}	
				/>
			</div>
		)
	}
}

export default Search
