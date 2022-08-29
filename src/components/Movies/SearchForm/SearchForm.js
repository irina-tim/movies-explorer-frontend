import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import { useState } from 'react'

function SearchForm({ findMovies, handleSearchError }) {
  const [inputValue, setInputValue] = useState('')
  const [isShort, setIsShort] = useState(false)
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
    value ? setIsShort(false) : setIsShort(true)
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
        <FilterCheckbox onClick={filterCheckboxClick} />
      </div>
    </section>
  )
}

export default SearchForm
