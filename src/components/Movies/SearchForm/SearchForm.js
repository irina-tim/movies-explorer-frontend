import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import { useEffect } from 'react'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { useLocation } from 'react-router-dom'

function SearchForm({ findMovies, handleSearchError }) {
  const [inputValue, setInputValue] = useLocalStorage('searchString', '')
  const [isShort, setIsShort] = useLocalStorage('shortMoviesOnly', false)
  const { pathname } = useLocation()

  useEffect(() => {
    if (inputValue) findMovies(inputValue, isShort)
  }, [])

  function handleSearchButtonClick(evt) {
    evt.preventDefault()
    if (inputValue === '' && pathname === '/movies') {
      handleSearchError('Нужно ввести ключевое слово')
    } else {
      handleSearchError('')
      findMovies(inputValue, isShort)
    }
  }
  function filterCheckboxClick(value) {
    setIsShort(value)
  }
  function handleEnterPress(e) {
    if (e.key === 'Enter') {
      handleSearchButtonClick(e)
    }
  }
  return (
    <section className="search-form">
      <div className="search-form__group">
        <div className="search-form__input-group">
          <input
            className="search-form__input"
            placeholder="Фильм"
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            required
            onKeyDown={handleEnterPress}
            value={inputValue}
          ></input>
          <button
            className="search-form__search-button"
            type="submit"
            onClick={handleSearchButtonClick}
          >
            Найти
          </button>
        </div>
        <p className="search-form__checkbox-label">Короткометражки</p>
        <FilterCheckbox onClick={filterCheckboxClick} checked={isShort} />
      </div>
    </section>
  )
}

export default SearchForm
