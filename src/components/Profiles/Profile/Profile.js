import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import classes from './Profile.module.css'

class Profile extends Component {
	render() {
		return (
			<Link to='/catalog'>
				<img src={this.props.img} className={classes.Profile} alt='avatar' />
				<p className={classes.Name}>{this.props.name}</p>
			</Link>
		)
	}
}

export default Profile
