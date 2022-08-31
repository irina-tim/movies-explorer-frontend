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
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import moviesApi from '../../utils/MoviesApi'
import { useState, useEffect } from 'react'
import { isShortMovie, calcCardsAmount } from '../../utils/utils'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import mainApi from '../../utils/MainApi'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import PrivateRoute from '../PrivateRoute/PrivateRoute'

function App() {
  const [allMovies, setAllMovies] = useState([])
  // const [allMovies, setAllMovies] = useLocalStorage('movies', [])
  /* const [filterLocalStorage, setFilterLocalStorage] = useLocalStorage(
    'filteredMovies',
    {}
  ) */
  const [isLoading, setIsLoading] = useState(false)
  const [errorTextValue, setErrorTextValue] = useState(null)
  const [isFetchError, setIsFetchError] = useState(false)
  const [cardsInRow, setCardsInRow] = useState(1)
  const [hiddenMovies, setHiddenMovies] = useState([])
  const [filter, setFilter] = useState({
    name: '',
    shortFilm: false,
    // saved: false,
  })
  const [filteredMovies, setFilteredMovies] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const [loggedIn, setLoggedIn] = useState(undefined)
  const [isRegistrationPassed, setIsRegistrationPassed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [profileErrorMessage, setProfileErrorMessage] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [savedMovies, setSavedMovies] = useState([])
  // const [savedUserSettings, setSavedUserSettings] = useState({})

  useEffect(() => {
    tokenCheck()
    /* setSavedUserSettings({
      searchString: localStorage.getItem('searchString'),
      shortMoviesOnly: localStorage.getItem('shortMoviesOnly'),
    }) */
  }, [])

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((data) => {
        setSavedMovies(data)
      })
      .catch((err) => console.log(err))
  }, [])

  /* useEffect(() => {
    if (loggedIn) {
      navigate('/movies')
    }
  }, [loggedIn]) */

  const handleRegister = ({ name, email, password }) => {
    setErrorMessage('')
    return mainApi
      .register(name, email, password)
      .then(() => {
        setIsRegistrationPassed(true)
        handleLogin({ email, password })
      })
      .catch((err) => {
        setErrorMessage(err.message)
        setIsRegistrationPassed(false)
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
    navigate('/sign-in')
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

  // function handleProfileEdit({ name, email }) {
  // setCurrentUser({ name, email })
  // }

  function findMovies(searchPhrase, isShort) {
    searchPhrase = searchPhrase.trim()
    console.log('allMovies = ', allMovies)
    console.log('searchPhrase = ', searchPhrase)
    console.log('isShort = ', isShort)
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
          console.log('data = ', data)
          console.log('allMovies = ', allMovies)
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

  function loadMore() {
    console.log('filteredMovies = ', filteredMovies)
    console.log('hiddenMovies = ', hiddenMovies)
    console.log('cardsInRow = ', cardsInRow)
  }

  function handlerResize() {
    setCardsInRow(calcCardsAmount())
    // console.log('calcCardsAmount() = ', calcCardsAmount())
    // console.log('----------------')
  }
  // console.log('cardsInRow (after) = ', cardsInRow)

  function saveMovie(movie) {
    mainApi
      .saveMovie(movie, currentUser._id)
      .then((data) => {
        setSavedMovies((state) => [...state, data])
      })
      .catch((err) => console.log(err))
  }

  function deleteMovie(id) {
    console.log('savedMovies = ', savedMovies)
    console.log('id = ', id)
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
    handlerResize()
    window.addEventListener('resize', handlerResize)
    /* return () => {
      window.removeEventListener('resize', handlerResize)
    } */
  }, [])

  useEffect(() => {
    console.log('useEffect filter = ', filter)
    console.log('useEffect allMovies = ', allMovies)
    const filtered = allMovies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(filter.name.toLowerCase()) &&
        (filter.isShort ? isShortMovie(movie.duration) : true)
      ) // &&
      // (filter.saved ? isSaved(movie.id) : true)
    })
    setFilteredMovies(filtered)
    setErrorTextValue(
      filter.name && !filtered.length ? 'Ничего не найдено' : null
    )
    // setHiddenMovies(filtered.splice(0, cardsInRow))
    // console.log('FILTERED = ', filtered)
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
                loadMore={loadMore}
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
                savedMovies={savedMovies}
                deleteMovie={deleteMovie}
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
