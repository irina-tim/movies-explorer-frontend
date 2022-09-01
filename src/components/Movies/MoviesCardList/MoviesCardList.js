import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList(props) {
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__group">
        {props.cards
          ? props.cards.map((card) => (
              <MoviesCard
                key={card.id}
                saveMovie={props.saveMovie}
                deleteMovie={props.deleteMovie}
                savedMovies={props.savedMovies}
                card={card}
              />
            ))
          : null}
      </div>
    </section>
  )
}

export default MoviesCardList
