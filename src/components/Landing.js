import React, { Component } from "react"
import "../style/Landing.css"
import Profile from "./Profile"

class Landing extends Component {
	constructor() {
		super()
		this.state = {
			profiles: [
				{ name: "Mona", img: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png" },
				{ name: "Jasmyne", img: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png" },
				{ name: "Aura", img: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/fd69a733850498.56ba69ac2f221.png" },
				{ name: "Tina", img: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/e70b1333850498.56ba69ac32ae3.png" }
			]
		}
	}
	render() {
		return (
			<div id='landing'>
				<h1 className='title slide-in-bck-center'>Who's Watching?</h1>
				
				<div className='profiles slide-in-bck-center'>
					{this.state.profiles.map((p, i) => (
						<Profile key={i} name={p.name} img={p.img} />
					))}
				</div>
			</div>
		)
	}
}

export default Landing
