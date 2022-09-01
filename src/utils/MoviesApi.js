class MoviesApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async _checkResponse(res) {
    const json = await res.json()
    if (res.ok) {
      return json
    }
    return Promise.reject(json)
  }

  getMovies() {
    return fetch(this.baseUrl).then(this._checkResponse)
  }
}

const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies')

export default moviesApi
