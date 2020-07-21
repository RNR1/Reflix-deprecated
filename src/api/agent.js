import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

const responseBody = (response) => response.data

const requests = {
	get: (url) => axios.get(url).then(responseBody),
	post: (url, body) => axios.post(url, body).then(responseBody),
	put: (url, body) => axios.put(url, body).then(responseBody),
	delete: (url) => axios.delete(url).then(responseBody)
}

export const Movies = {
	list: () => requests.get('/movies'),
	movie: (id) => requests.get(`movie/${id}`)
}

export const Profiles = {
	list: () => requests.get('/profiles'),
	profile: (id) => requests.get(`/profile/${id}`),
	rent: (action, profile, movie) =>
		requests.put(`/profile/${action}?profile=${profile}&movie=${movie}`)
}
