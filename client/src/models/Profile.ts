import { MovieDetails } from "../api/responses"

export default interface Profile {
  _id: { $oid: string }
  name: string
  img: string
  list: number[] | MovieDetails[]
}
