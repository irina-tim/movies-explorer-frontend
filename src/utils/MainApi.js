import { MAIN_API_URL, MOVIES_API_URL } from './constants'

class MainApi {
  constructor(options) {
    this._options = options
  }

  async _checkResponse(res) {
    const json = await res.json()
    if (res.ok) {
      return json
    }
    return Promise.reject({ ...json, status: res.status })
  }

  register(name, email, password) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password, email }),
    }).then(this._checkResponse)
  }

  login(email, password) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse)
  }

  checkToken = (token) => {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }).then(this._checkResponse)
  }

  updateToken(token) {
    this._options.headers['Authorization'] = `Bearer ${token}`
  }

  updateProfile(name, email) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._options.headers,
      body: JSON.stringify({ name, email }),
    }).then(this._checkResponse)
  }

  saveMovie(movie, userId) {
    const { country, director, duration, year, description, nameRU, nameEN } =
      movie

    return fetch(`${this._options.baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._options.headers,
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        nameRU,
        nameEN,
        image: `${MOVIES_API_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${MOVIES_API_URL}${movie.image.formats.thumbnail.url}`,
        owner: userId,
        movieId: movie.id,
      }),
    }).then(this._checkResponse)
  }

  getSavedMovies() {
    return fetch(`${this._options.baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: this._options.headers,
    }).then(this._checkResponse)
  }

  deleteMovie(movieId) {
    return fetch(`${this._options.baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._options.headers,
    }).then(this._checkResponse)
  }
}

const token = localStorage.getItem('jwt')

const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
})

export default mainApi