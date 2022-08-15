import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm() {
  return (
    <section className="search-form">
      <div className="search-form__group">
        <div className="search-form__input-group">
          <input className="search-form__input" placeholder="Фильм"></input>
          <button className="search-form__search-button">Найти</button>
        </div>
        <p className="search-form__checkbox-label">Короткометражки</p>
        <FilterCheckbox />
      </div>
    </section>
  )
}

export default SearchForm
