import './App.css'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import NotFound from '../NotFound/NotFound'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Route, Routes, useNavigate } from 'react-router-dom'
import moviesApi from '../../utils/MoviesApi'
import { useState, useEffect } from 'react'
import { isShortMovie } from '../../utils/utils'
import mainApi from '../../utils/MainApi'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import PrivateRoute from '../PrivateRoute/PrivateRoute'

function App() {
  const [allMovies, setAllMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorTextValue, setErrorTextValue] = useState(null)
  const [isFetchError, setIsFetchError] = useState(false)
  const [filter, setFilter] = useState({
    name: '',
    shortFilm: false,
  })
  const [filteredMovies, setFilteredMovies] = useState([])
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState('')
  const [profileErrorMessage, setProfileErrorMessage] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [savedMovies, setSavedMovies] = useState([])
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([])
  const [savedMoviesFilter, setSavedMoviesFilter] = useState({
    searchPhrase: '',
    isShort: false,
  })

  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    let { searchPhrase, isShort } = savedMoviesFilter
    searchPhrase = searchPhrase.trim()
    const filtered =
      searchPhrase === ''
        ? savedMovies
        : savedMovies.filter((movie) => {
            return (
              movie.nameRU.toLowerCase().includes(searchPhrase.toLowerCase()) &&
              (isShort ? isShortMovie(movie.duration) : true)
            )
          })
    setFilteredSavedMovies(filtered)
  }, [savedMovies, savedMoviesFilter])

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((data) => {
        setSavedMovies(data)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleRegister = ({ name, email, password }) => {
    setErrorMessage('')
    return mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin({ email, password })
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
  }

  const handleLogin = ({ email, password }) => {
    setErrorMessage('')
    return mainApi
      .login(email, password)
      .then((data) => {
        mainApi.updateToken(data['token'])
        setLoggedIn(true)
        if (data['token']) {
          localStorage.setItem('jwt', data['token'])
          tokenCheck()
        }
      })
      .then(() => {
        navigate('/movies')
      })
      .catch((err) => {
        setErrorMessage(err.message)
      })
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt')
      mainApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            const userData = {
              id: res.data._id,
              email: res.data.email,
              name: res.data.name,
            }
            setLoggedIn(true)
            setCurrentUser(userData)
          }
        })
        .catch((err) => {
          setErrorMessage(
            'При авторизации произошла ошибка. Переданный токен некорректен.'
          )
          handleSignOut()
        })
    } else {
      setErrorMessage(
        'При авторизации произошла ошибка. Токен не передан или передан не в том формате'
      )
      handleSignOut()
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    setCurrentUser(null)
    navigate('/')
  }

  const updateProfile = ({ name, email }) => {
    return mainApi
      .updateProfile(name, email)
      .then((res) => {
        setProfileErrorMessage('')
        if (res) {
          const userData = {
            id: res.data._id,
            email: res.data.email,
            name: res.data.name,
          }
          setCurrentUser(userData)
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          setProfileErrorMessage('Пользователь с таким email уже существует.')
        } else {
          setProfileErrorMessage('При обновлении профиля произошла ошибка.')
        }

        throw err
      })
  }

  function navigateToLogin() {
    setErrorMessage('')
    navigate('/sign-in')
  }

  function navigateToRegister() {
    setErrorMessage('')
    navigate('/sign-up')
  }

  function navigateToMovies() {
    navigate('/movies')
  }

  function navigateToSavedMovies() {
    navigate('/saved-movies')
  }

  function navigateToProfile() {
    navigate('/profile')
  }

  function navigateToMain() {
    navigate('/')
  }

  function findMovies(searchPhrase, isShort) {
    searchPhrase = searchPhrase.trim()
    if (allMovies.length > 0) {
      setFilter({
        name: searchPhrase,
        isShort,
      })
    } else {
      setIsLoading(true)
      moviesApi
        .getMovies()
        .then((data) => {
          data.forEach((movie) => {
            Object.keys(movie).map(
              (key) =>
                (movie[key] === null || undefined) && (movie[key] = 'Нет')
            )
          })
          setAllMovies(data)
        })
        .catch((err) => {
          setIsFetchError(true)
          setErrorTextValue(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          )
          console.log(err)
        })
        .finally(() => {
          setFilter({
            name: searchPhrase,
            isShort,
          })
          setIsLoading(false)
        })
    }
  }

  function findSavedMovies(searchPhrase, isShort) {
    setSavedMoviesFilter({ searchPhrase, isShort })
  }

  function saveMovie(movie) {
    mainApi
      .saveMovie(movie, currentUser._id)
      .then((data) => {
        setSavedMovies((state) => [...state, data])
      })
      .catch((err) => console.log(err))
  }

  function deleteMovie(id) {
    const [{ _id }] = savedMovies.filter((el) => Number(el.movieId) === id)
    mainApi
      .deleteMovie(_id)
      .then(() => {
        setSavedMovies((state) => state.filter((el) => el._id !== _id))
        setFilter((state) => ({ ...state }))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    const filtered = allMovies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(filter.name.toLowerCase()) &&
        (filter.isShort ? isShortMovie(movie.duration) : true)
      )
    })
    setFilteredMovies(filtered)
    setErrorTextValue(
      filter.name && !filtered.length ? 'Ничего не найдено' : null
    )
  }, [filter, allMovies])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          index
          element={
            <>
              <Header
                isLoggedIn={loggedIn}
                isRegisterPage={false}
                isLoginPage={false}
                navigateToLogin={navigateToLogin}
                navigateToRegister={navigateToRegister}
                navigateToMain={navigateToMain}
                navigateToMovies={navigateToMovies}
                navigateToSavedMovies={navigateToSavedMovies}
                navigateToProfile={navigateToProfile}
              />
              <Main />
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <Header
                isLoggedIn={loggedIn}
                isRegisterPage={true}
                isLoginPage={false}
                navigateToMain={navigateToMain}
              />
              <Register
                isLoggedIn={loggedIn}
                navigateToLogin={navigateToLogin}
                navigateToMain={navigateToMain}
                handleRegister={handleRegister}
                errorMessage={errorMessage}
              />
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <>
              <Header
                isLoggedIn={loggedIn}
                isRegisterPage={false}
                isLoginPage={true}
                navigateToMain={navigateToMain}
              />
              <Login
                isLoggedIn={loggedIn}
                navigateToRegister={navigateToRegister}
                navigateToMain={navigateToMain}
                handleLogin={handleLogin}
                errorMessage={errorMessage}
              />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header
                isLoggedIn={loggedIn}
                isRegisterPage={false}
                isLoginPage={false}
                navigateToMovies={navigateToMovies}
                navigateToSavedMovies={navigateToSavedMovies}
                navigateToProfile={navigateToProfile}
                navigateToMain={navigateToMain}
              />
              <PrivateRoute
                loggedIn={loggedIn}
                component={Movies}
                allMovies={allMovies}
                findMovies={findMovies}
                isLoading={isLoading}
                filteredMovies={filteredMovies}
                errorTextValue={errorTextValue}
                setErrorTextValue={setErrorTextValue}
                isFetchError={isFetchError}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                savedMovies={savedMovies}
              />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header
                isLoggedIn={loggedIn}
                isRegisterPage={false}
                isLoginPage={false}
                navigateToMovies={navigateToMovies}
                navigateToSavedMovies={navigateToSavedMovies}
                navigateToProfile={navigateToProfile}
                navigateToMain={navigateToMain}
              />
              <PrivateRoute
                loggedIn={loggedIn}
                component={SavedMovies}
                savedMovies={filteredSavedMovies}
                deleteMovie={deleteMovie}
                findMovies={findSavedMovies}
              />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header
                isLoggedIn={loggedIn}
                isRegisterPage={false}
                isLoginPage={false}
                navigateToMovies={navigateToMovies}
                navigateToSavedMovies={navigateToSavedMovies}
                navigateToProfile={navigateToProfile}
                navigateToMain={navigateToMain}
              />
              <PrivateRoute
                loggedIn={loggedIn}
                component={Profile}
                handleSignOut={handleSignOut}
                handleProfileEdit={updateProfile}
                errorMessage={profileErrorMessage}
              />
            </>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </CurrentUserContext.Provider>
  )
}

export default App
