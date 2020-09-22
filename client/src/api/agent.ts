import axios, { AxiosResponse } from "axios"
import Movie from "../models/Movie"
import Profile from "../models/Profile"
import { SearchResponse } from "./responses"

const API_KEY = process.env.REACT_APP_MOVIES_API_KEY

const profiles = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const movies = axios.create({
  baseURL: process.env.REACT_APP_MOVIES_API_URL,
})

const responseBody = (response: AxiosResponse) => response.data

export const Movies = {
  trending: (): Promise<SearchResponse> =>
    movies.get(`/trending/movie/week?api_key=${API_KEY}`).then(responseBody),
  popular: (): Promise<SearchResponse> =>
    movies
      .get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(responseBody),
  movie: (id: string): Promise<Movie> =>
    movies.get(`/movie/${id}?api_key=${API_KEY}`).then(responseBody),
  search: (value: string): Promise<SearchResponse> =>
    movies
      .get(
        `/search/movie?query=${value}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`
      )
      .then(responseBody),
}

export const Profiles = {
  list: (): Promise<Profile[]> => profiles.get("/profiles").then(responseBody),
  profile: (id: string): Promise<Profile> =>
    profiles.get(`/profile/${id}`).then(responseBody),
  rent: (
    action: string,
    profile: string,
    movie: number
  ): Promise<{ message: string }> =>
    profiles
      .put(`/profile/${action}?profile=${profile}&movie=${movie}`, null)
      .then(responseBody),
}
