export interface Profile {
  _id?: { $oid: string }
  name: string
  img: string
  budget: number
  rentals: number[]
}
