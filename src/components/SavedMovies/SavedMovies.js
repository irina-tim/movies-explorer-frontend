import './SavedMovies.css'
import SearchForm from '../Movies/SearchForm/SearchForm'
// import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList'

function SavedMovies() {
  // Temp cards
  let cards = []
  for (let i = 0; i < 3; i++) {
    cards.push({
      name: '33 слова о дизайне',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      duration: '1ч42м',
    })
  }
  return (
    <main className="content">
      <SearchForm />
      <MoviesCardList cards={cards} />
    </main>
  )
}

export default SavedMovies
