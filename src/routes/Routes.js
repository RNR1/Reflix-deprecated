import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import CatalogPage from '../pages/CatalogPage'
import MovieDetailPage from '../pages/MovieDetailPage'

export default function Routes() {
	return (
		<Switch>
			<Route exact path='/' component={LandingPage} />
			<Route path='/catalog' component={CatalogPage} />
			<Route path='/movies/:id' component={MovieDetailPage} />
		</Switch>
	)
}
