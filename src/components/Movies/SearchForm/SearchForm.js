import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm({
  handleSearchButtonClick,
  handleOnChange,
  inputValue,
  filterCheckboxClick,
  isShort,
}) {
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
            onChange={handleOnChange}
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
