import React, { lazy, Suspense } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Spinner from "../components/Layout/Spinner"

const LandingPage = lazy(() => import("../pages/LandingPage"))
const CatalogPage = lazy(() => import("../pages/CatalogPage"))
const MovieDetailPage = lazy(() => import("../pages/MovieDetailPage"))
const NotFound = lazy(() => import("../pages/NotFound"))

export default function Routes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/catalog" component={CatalogPage} />
        <Route path="/movies/:id" component={MovieDetailPage} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  )
}
