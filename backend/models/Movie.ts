export default interface Movie {
	_id: { $oid: string }
	isRented: boolean
	title: string
	year: number
	img: string
	description: string
}
