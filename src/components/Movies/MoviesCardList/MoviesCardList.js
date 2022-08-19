import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList(props) {
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__group">
        {props.cards
          ? props.cards.map((card, i) => <MoviesCard {...card} key={i} />)
          : null}
      </div>
    </section>
  )
}

export default MoviesCardList
