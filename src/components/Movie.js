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

    toggleInput = () => this.props.toggleInput()

    clearSearch = () => this.props.clearSearch()

    render() {
        let isRented = this.props.list === "rented"
		return (
        <div className='movie slide-in-bck-center'>
            <Link to={`/movies/${this.props.info.id}`}>
            <img onClick={this.toggleInput} src={this.props.info.img} alt={this.props.info.title}/>
            </Link>
            {isRented ? <FontAwesomeIcon icon={faMinus} className="icon" onClick={this.returnMovie} /> : <FontAwesomeIcon icon={faPlus} className="icon" onClick={this.rentMovie} />}
            
        </div>
        )
	}
}

export default Movie
