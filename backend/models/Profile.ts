export interface Profile {
  _id?: { $oid: string }
  name: string
  img: string
  rentals: number[]
}
