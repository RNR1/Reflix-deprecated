import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import Spinner from '../components/Spinner/Spinner'

const LandingPage = lazy(() => import('../pages/LandingPage'))
const CatalogPage = lazy(() => import('../pages/CatalogPage'))
const MovieDetailPage = lazy(() => import('../pages/MovieDetailPage'))

export default function Routes() {
	return (
		<Suspense fallback={<Spinner />}>
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route path='/catalog' component={CatalogPage} />
				<Route path='/movies/:id' component={MovieDetailPage} />
			</Switch>
		</Suspense>
	)
}
