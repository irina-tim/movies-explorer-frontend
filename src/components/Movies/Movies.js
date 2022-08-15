import './Movies.css'
import SearchForm from './SearchForm/SearchForm'
// import Preloader from "./Preloader/Preloader";
import MoviesCardList from './MoviesCardList/MoviesCardList'
import LoadMore from './LoadMore/LoadMore'

function Movies() {
  // Temp cards
  let cards = []
  for (let i = 0; i < 16; i++) {
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
      <LoadMore />
    </main>
  )
}

export default Movies
