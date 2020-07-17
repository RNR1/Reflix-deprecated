import { useContext } from 'react'
import { MoviesContext } from '../context/movies'
import { SearchContext } from '../context/search'

export default function useSearch() {
	const { movies } = useContext(MoviesContext)
	const {
		searchValue,
		setSearchValue,
		displaySearch,
		setDisplaySearch
	} = useContext(SearchContext)

	const search = ({ target: { value } }) => setSearchValue(value)

	const searchInProgress = () => searchValue.length > 0

	const toggleSearch = () => {
		setDisplaySearch(!displaySearch)
		if (displaySearch) clearSearch()
	}

	const searchResults = () =>
		movies.filter((m) =>
			m.title.toLowerCase().includes(searchValue.toLowerCase())
		)

	const clearSearch = () => setSearchValue('')

	return {
		clearSearch,
		displaySearch,
		search,
		searchInProgress,
		searchResults,
		searchValue,
		toggleSearch
	}
}
