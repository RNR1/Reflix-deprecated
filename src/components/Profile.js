import React, { Component } from "react"
import { Link } from "react-router-dom"

class Profile extends Component {
	render() {
		return (
			<Link
				to='/catalog'
				className='profile'
				style={{ backgroundColor: this.props.color }}
			>
				{this.props.name}
			</Link>
		)
	}
}

export default Profile
