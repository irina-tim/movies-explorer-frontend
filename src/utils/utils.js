import { SHORT_MOVIE_DURATION, CARDS_IN_ROW } from './constants'

export function isShortMovie(duration) {
  return duration <= SHORT_MOVIE_DURATION
}

export function calcCardsAmount() {
  let amount = 1
  Object.keys(CARDS_IN_ROW)
    .sort((a, b) => a - b)
    .forEach((key) => {
      if (window.innerWidth > key) {
        amount = CARDS_IN_ROW[key]
      }
    })
  // console.log('amount = ', amount)
  return amount
}
