import './MoviesCard.css'
import RoundCheckbox from '../RoundCheckbox/RoundCheckbox'

function MoviesCard(card) {
  return (
    <article className="movies-card">
      <img className="movies-card__image" src={card.link} alt={card.name} />
      <div className="movies-card__group">
        <h2 className="movies-card__title">{card.name}</h2>
        <RoundCheckbox />
      </div>
      <p className="movies-card__duration">{card.duration}</p>
    </article>
  )
}

export default MoviesCard
