import './MoviesCard.css'
import RoundCheckbox from '../RoundCheckbox/RoundCheckbox'
import { useLocation } from 'react-router-dom'

function MoviesCard(props) {
  console.log('props.card = ', props.card)
  const { pathname } = useLocation()
  function convertedTime() {
    const hours = Math.floor(props.card.duration / 60)
    const minutes = props.card.duration % 60
    return (
      (hours !== 0 ? `${hours}ч` : '') + (minutes !== 0 ? `${minutes}м` : '')
    )
  }
  return (
    <article className="movies-card">
      <a target="_blank" rel="noreferrer" href={props.card.trailerLink}>
        <img
          className="movies-card__image"
          src={
            pathname === '/saved-movies'
              ? props.card.image
              : 'https://api.nomoreparties.co' + props.card.image.url
          }
          alt={props.card.name}
        />
      </a>
      <div className="movies-card__group">
        <h2 className="movies-card__title">{props.card.nameRU}</h2>
        {pathname === '/saved-movies' ? (
          <button
            onClick={() => props.deleteMovie(+props.card.movieId)}
            type="button"
            className="card__delete-btn"
          />
        ) : (
          <RoundCheckbox
            savedMovies={props.savedMovies}
            card={props.card}
            saveMovie={props.saveMovie}
            deleteMovie={props.deleteMovie}
          />
        )}
      </div>
      <p className="movies-card__duration">{convertedTime()}</p>
    </article>
  )
}

export default MoviesCard
