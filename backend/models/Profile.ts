import type { Movie } from "./Movie.ts"

export interface Profile {
  _id?: { $oid: string }
  name: string
  img: string
  budget: number
  rentals: Movie[]
}
