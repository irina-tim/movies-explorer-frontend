import './Movies.css'
import SearchForm from './SearchForm/SearchForm'
import Preloader from './Preloader/Preloader'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import LoadMore from './LoadMore/LoadMore'
import { useState, useEffect } from 'react'

function Movies(props) {
  const [errorTextValue, setErrorTextValue] = useState(null)
  useEffect(() => {
    // console.log('errorTextValue = ', errorTextValue)
    props.filteredMovies.length === 0 &&
      errorTextValue === '' &&
      handleSearchError('Ничего не найдено')
  }, [props.filteredMovies])
  useEffect(() => {
    setErrorTextValue(props.errorTextValue)
  }, [props.errorTextValue])
  function handleSearchError(errorText) {
    !props.isFetchError && setErrorTextValue(errorText)
  }
  return (
    <main className="content">
      <SearchForm
        findMovies={props.findMovies}
        handleSearchError={handleSearchError}
      />
      {props.isLoading && <Preloader />}
      <div className="movies__error-text">{errorTextValue}</div>
      {errorTextValue === '' && <MoviesCardList cards={props.filteredMovies} />}
      <LoadMore loadMore={props.loadMore} />
    </main>
  )
}

export default Movies
