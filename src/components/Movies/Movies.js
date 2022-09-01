import React, { useEffect, useState, useDebugValue } from 'react'

import './Movies.css'
import SearchForm from './SearchForm/SearchForm'
import Preloader from './Preloader/Preloader'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import LoadMore from './LoadMore/LoadMore'
import { calcCardsAmount } from '../../utils/utils'
import { INIT_COLUMNS_TO_ROWS, COLUMNS_TO_ROWS } from '../../utils/constants'

const useLoadMore = () => {
  const [grid, setGrid] = useState(null)
  useDebugValue(grid)

  function loadMore() {
    setGrid((previousGrid) => ({
      columns: previousGrid.columns,
      rows: previousGrid.rows + COLUMNS_TO_ROWS[previousGrid.columns],
    }))
  }

  useEffect(() => {
    function handlerResize() {
      setGrid(({ columns, rows }) => {
        const nextColumns = calcCardsAmount()
        const nextRows = Math.ceil((rows * columns) / nextColumns)

        return {
          rows: nextRows,
          columns: nextColumns,
        }
      })
    }

    const inRow = calcCardsAmount()
    setGrid((previousGrid) =>
      previousGrid
        ? previousGrid
        : {
            columns: inRow,
            rows: INIT_COLUMNS_TO_ROWS[inRow],
          }
    )
    window.addEventListener('resize', handlerResize)

    return () => window.removeEventListener('resize', handlerResize)
  }, [])

  return {
    loadMore,
    len: grid ? grid.rows * grid.columns : 1,
  }
}

function Movies(props) {
  function handleSearchError(errorText) {
    !props.isFetchError && props.setErrorTextValue(errorText)
  }

  const { loadMore, len } = useLoadMore()

  return (
    <main className="content">
      <SearchForm
        findMovies={props.findMovies}
        handleSearchError={handleSearchError}
      />
      {props.isLoading && <Preloader />}
      <div className="movies__error-text">{props.errorTextValue}</div>
      {!props.errorTextValue && (
        <MoviesCardList
          savedMovies={props.savedMovies}
          cards={props.filteredMovies.slice(0, len)}
          saveMovie={props.saveMovie}
          deleteMovie={props.deleteMovie}
          findMovies={props.findMovies}
        />
      )}
      {len < props.filteredMovies.length && <LoadMore loadMore={loadMore} />}
    </main>
  )
}

export default Movies
