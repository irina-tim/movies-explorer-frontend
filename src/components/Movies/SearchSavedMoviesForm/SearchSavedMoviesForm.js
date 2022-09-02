import { useEffect } from 'react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'
import SearchForm from '../SearchForm/SearchForm'

function SearchSavedMoviesForm({ findMovies, handleSearchError }) {
  const [inputValue, setInputValue] = useLocalStorage('saved_searchString', '')
  const [isShort, setIsShort] = useLocalStorage('saved_shortMoviesOnly', false)

  useEffect(() => {
    if (inputValue) findMovies(inputValue, isShort)
  }, [])

  useEffect(() => {
    const clearFilter = () => {
      setInputValue('')
      setIsShort(false)
    }
    window.addEventListener('unload', clearFilter)
    return () => window.removeEventListener('unload', clearFilter)
  }, [setInputValue, setIsShort])

  function handleOnChange(e) {
    setInputValue(e.target.value)
  }

  function handleSearchButtonClick(evt) {
    evt.preventDefault()
    handleSearchError('')
    findMovies(inputValue, isShort)
  }
  function filterCheckboxClick(value) {
    setIsShort(value)
    if (!inputValue) setInputValue(' ')
    findMovies(inputValue || ' ', value)
  }

  return (
    <SearchForm
      handleSearchButtonClick={handleSearchButtonClick}
      handleOnChange={handleOnChange}
      inputValue={inputValue}
      filterCheckboxClick={filterCheckboxClick}
      isShort={isShort}
    />
  )
}

export default SearchSavedMoviesForm
