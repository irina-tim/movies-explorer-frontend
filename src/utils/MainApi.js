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
    return Promise.reject(json)
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  updateToken(token) {
    this._options.headers['Authorization'] = `Bearer ${token}`;
  }  
}

const token = localStorage.getItem('jwt');

const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default mainApi
