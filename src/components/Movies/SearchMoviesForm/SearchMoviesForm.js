import { useEffect } from 'react'

import { useLocalStorage } from '../../../hooks/useLocalStorage'
import SearchForm from '../SearchForm/SearchForm'

function SearchMoviesForm({ findMovies, handleSearchError }) {
  const [inputValue, setInputValue] = useLocalStorage('searchString', '')
  const [isShort, setIsShort] = useLocalStorage('shortMoviesOnly', false)

  useEffect(() => {
    if (inputValue) findMovies(inputValue, isShort)
  }, [])

  function handleOnChange(e) {
    setInputValue(e.target.value)
  }

  function handleSearchButtonClick(evt) {
    evt.preventDefault()
    if (inputValue === '') {
      handleSearchError('Нужно ввести ключевое слово')
    } else {
      handleSearchError('')
      findMovies(inputValue, isShort)
    }
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

export default SearchMoviesForm
