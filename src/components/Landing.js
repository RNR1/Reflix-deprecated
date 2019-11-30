import React, { Component } from "react"
import "../style/Landing.css"
import Profile from "./Profile"

class Landing extends Component {
	constructor() {
		super()
		this.state = {
			profiles: [
				{ name: "Mona", color: "#3398DB" },
				{ name: "Jasmyne", color: "#E74C3C" },
				{ name: "Aura", color: "#2CCC71" },
				{ name: "Tina", color: "#F1C410" }
			]
		}
	}
	render() {
		return (
			<div id='container'>
				<div id='landing'>
					<h1 className='title'>Who's Watching?</h1>
					<div className='profiles'>
						{this.state.profiles.map((p, i) => (
							<Profile key={i} name={p.name} color={p.color} />
						))}
					</div>
				</div>
			</div>
		)
	}
}

export default Landing
