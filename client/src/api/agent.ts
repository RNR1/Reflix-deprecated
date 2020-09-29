import axios, { AxiosResponse } from "axios"
import type Profile from "../models/Profile"
import type { MovieDetails, SearchResponse } from "./responses"

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
  topRated: (): Promise<SearchResponse> =>
    movies
      .get(`/movie/top_rated?api_key=${API_KEY}&language=en-US`)
      .then(responseBody),
  movie: (id: number): Promise<MovieDetails> =>
    movies.get(`/movie/${id}?api_key=${API_KEY}`).then(responseBody),
  search: (value: string): Promise<SearchResponse> =>
    movies
      .get(
        `/search/movie?query=${value}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`
      )
      .then(responseBody),
  list: (list: number[]): Promise<MovieDetails[]> =>
    Promise.all(list.map(id => Movies.movie(id))),
}

export const Profiles = {
  list: (): Promise<Profile[]> => profiles.get("/profiles").then(responseBody),
  profile: async (id: string): Promise<Profile> =>
    await profiles.get<Profile>(`/profile/${id}`).then(transformMoviesList),
  listMovie: (
    action: string,
    profile: string,
    movie: number
  ): Promise<{ message: string }> =>
    profiles
      .put(`/profile/${action}?profile=${profile}&movie=${movie}`, null)
      .then(responseBody),
}

async function transformMoviesList({ data: profile }: AxiosResponse<Profile>) {
  const list = await Movies.list(profile.list as number[])
  profile.list = list
  return profile
}
