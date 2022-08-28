import './SavedMovies.css'
import SearchForm from '../Movies/SearchForm/SearchForm'
// import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'

function SavedMovies(props) {
  return (
    <main className="content">
      <SearchForm />
      <MoviesCardList
        cards={props.savedMovies}
        deleteMovie={props.deleteMovie}
      />
    </main>
  )
}

export default SavedMovies
