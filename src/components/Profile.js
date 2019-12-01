import React, { Component } from "react"
import { Link } from "react-router-dom"

class Profile extends Component {
	render() {
		return (
			<Link to='/catalog'>
				<img src={this.props.img} className="profile" alt="avatar" />
				<p>{this.props.name}</p>
			</Link>
		)
	}
}

export default Profile
