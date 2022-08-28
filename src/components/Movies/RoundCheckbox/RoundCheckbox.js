import './RoundCheckbox.css'
import { useState } from 'react'

function RoundCheckbox(props) {
  const [checked, setChecked] = useState(false)
  function isSaved(savedMovies, id) {
    return (savedMovies || []).map((el) => Number(el.movieId)).includes(id)
  }
  const isMovieSaved = isSaved(props.savedMovies, props.card.id)

  return (
    <label className="round-checkbox">
      <input
        className="round-checkbox__default-checkbox"
        type="checkbox"
        checked={isMovieSaved}
        onChange={() => {
          if (isMovieSaved) props.deleteMovie(props.card.id)
          else props.saveMovie(props.card)
        }}
      ></input>
      <div className="round-checkbox__custom-checkbox"></div>
    </label>
  )
}

export default RoundCheckbox
