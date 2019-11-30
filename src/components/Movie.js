import React, { Component } from "react"
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import '../style/Movie.css'

class Movie extends Component {
    rentMovie = () => {
        this.props.rentMovie(this.props.info.id)
    }
    returnMovie = () => {
        this.props.returnMovie(this.props.info.id)
    }

    render() {
        let isRented = this.props.list === "rented"
		return (
        <div className='movie'>
            {isRented ? <FontAwesomeIcon icon={faMinus} className="icon" onClick={this.returnMovie} /> : <FontAwesomeIcon icon={faPlus} className="icon" onClick={this.rentMovie} />}
            <Link to={`/movies/${this.props.info.id}`}>
            <img src={this.props.info.img} alt={this.props.info.title}/>
            <h4>{this.props.info.title}</h4>
            </Link>
            
        </div>
        )
	}
}

export default Movie
