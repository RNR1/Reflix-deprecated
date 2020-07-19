import Movie from './Movie.ts'

export default interface Profile {
	_id?: { $oid: string }
	name: string
	img: string
	budget: number
	rentals: Movie[]
}
