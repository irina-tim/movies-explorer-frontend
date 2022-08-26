import { MAIN_API_URL, MOVIES_API_URL } from './constants'

class MainApi {
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

  register(name, email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password, email }),
    }).then(this._checkResponse)
  }

  
}

const mainApi = new MainApi(MAIN_API_URL)

export default mainApi
