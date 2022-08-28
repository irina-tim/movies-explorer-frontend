import './MoviesCard.css'
import RoundCheckbox from '../RoundCheckbox/RoundCheckbox'
import { useLocation } from 'react-router-dom'

function MoviesCard(props) {
  const { pathname } = useLocation()
  return (
    <article className="movies-card">
      <img
        className="movies-card__image"
        src={
          pathname === '/saved-movies'
            ? props.card.image
            : 'https://api.nomoreparties.co' + props.card.image.url
        }
        alt={props.card.name}
      />
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
      <p className="movies-card__duration">{props.card.duration}</p>
    </article>
  )
}

export default MoviesCard
