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
	list: () => requests.get('/movies')
}

export const Profiles = {
	list: () => requests.get('/profiles')
}
