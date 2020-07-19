export default interface Movie {
	_id: { $oid: string }
	title: string
	year: number
	img: string
	description: string
}
