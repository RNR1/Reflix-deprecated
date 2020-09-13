import axios, { AxiosResponse } from "axios"
import Movie from "../models/Movie"
import Profile from "../models/Profile"

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL
    : "/api"

const responseBody = (response: AxiosResponse) => response.data

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body?: {} | null) =>
    axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
}

export const Movies = {
  list: (): Promise<Movie[]> => requests.get("/movies"),
  movie: (id: string): Promise<Movie> => requests.get(`movie/${id}`),
}

export const Profiles = {
  list: (): Promise<Profile[]> => requests.get("/profiles"),
  profile: (id: string): Promise<Profile> => requests.get(`/profile/${id}`),
  rent: (
    action: string,
    profile: string,
    movie: string
  ): Promise<{ message: string }> =>
    requests.put(`/profile/${action}?profile=${profile}&movie=${movie}`, null),
}
