import './SavedMovies.css'
import SearchSavedMoviesForm from '../Movies/SearchSavedMoviesForm/SearchSavedMoviesForm'
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'

function SavedMovies(props) {
  function handleSearchError(errorText) {
    console.log(errorText)
  }
  return (
    <main className="content">
      <SearchSavedMoviesForm
        findMovies={props.findMovies}
        handleSearchError={handleSearchError}
      />
      <MoviesCardList
        cards={props.savedMovies}
        deleteMovie={props.deleteMovie}
      />
    </main>
  )
}

export default SavedMovies
