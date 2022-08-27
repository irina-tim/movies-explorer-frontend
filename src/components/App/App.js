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
import { CurrentUserContext } from "../../contexts/CurrentUserContext"

function App() {
  // const [allMovies, setAllMovies] = useState([])
  const [allMovies, setAllMovies] = useLocalStorage('movies', [])
  const [filterLocalStorage, setFilterLocalStorage] = useLocalStorage(
    'filteredMovies',
    {}
  )
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
  const [loggedIn, setLoggedIn] = useState(false)
  const [isRegistrationPassed, setIsRegistrationPassed] = useState(false)
  const [userData, setUserData] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies')
    }
  }, [loggedIn])

  const handleRegister = ({ name, email, password }) => {
    setErrorMessage('');
    return mainApi
      .register(name, email, password)
      .then(() => {
        setIsRegistrationPassed(true)
        navigate('/sign-in')
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsRegistrationPassed(false)
      })
  }

  const handleLogin = ({ email, password }) => {
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
      .catch((err) => {
        console.log(err)
        navigate('/')
      })
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt')
      mainApi.checkToken(jwt).then((res) => {
        if (res) {
          const userData = {
            id: res.data._id,
            email: res.data.email,
            name: res.data.name,
          }
          setLoggedIn(true)
          setUserData(userData)
        }
      })
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserData(null);
    navigate("/sign-in");
  }

  function navigateToLogin() {
    navigate('/sign-in')
  }

  function navigateToRegister() {
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

  useEffect(() => {
    handlerResize()
    window.addEventListener('resize', handlerResize)
    /* return () => {
      window.removeEventListener('resize', handlerResize)
    } */
  }, [])

  useEffect(() => {
    const filtered = allMovies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(filter.name.toLowerCase()) &&
        (filter.isShort ? isShortMovie(movie.duration) : true)
      ) // &&
      // (filter.saved ? isSaved(movie.id) : true)
    })
    setFilteredMovies(filtered)
    // setHiddenMovies(filtered.splice(0, cardsInRow))
    // console.log('FILTERED = ', filtered)
  }, [filter])
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          index
          element={
            <>
              <Header
                isLoggedIn={false}
                isRegisterPage={false}
                isLoginPage={false}
                navigateToLogin={navigateToLogin}
                navigateToRegister={navigateToRegister}
                navigateToMain={navigateToMain}
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
                isLoggedIn={true}
                isRegisterPage={true}
                isLoginPage={false}
                navigateToMain={navigateToMain}
              />
              <Register
                navigateToLogin={navigateToLogin}
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
                isLoggedIn={true}
                isRegisterPage={false}
                isLoginPage={true}
                navigateToMain={navigateToMain}
              />
              <Login navigateToRegister={navigateToRegister} handleLogin={handleLogin} errorMessage={errorMessage} />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header
                isLoggedIn={true}
                isRegisterPage={false}
                isLoginPage={false}
                navigateToMovies={navigateToMovies}
                navigateToSavedMovies={navigateToSavedMovies}
                navigateToProfile={navigateToProfile}
                navigateToMain={navigateToMain}
              />
              <Movies
                allMovies={allMovies}
                findMovies={findMovies}
                isLoading={isLoading}
                filteredMovies={filteredMovies}
                errorTextValue={errorTextValue}
                isFetchError={isFetchError}
                loadMore={loadMore}
              />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header
                isLoggedIn={true}
                isRegisterPage={false}
                isLoginPage={false}
                navigateToMovies={navigateToMovies}
                navigateToSavedMovies={navigateToSavedMovies}
                navigateToProfile={navigateToProfile}
                navigateToMain={navigateToMain}
              />
              <SavedMovies />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header
                isLoggedIn={true}
                isRegisterPage={false}
                isLoginPage={false}
                navigateToMovies={navigateToMovies}
                navigateToSavedMovies={navigateToSavedMovies}
                navigateToProfile={navigateToProfile}
                navigateToMain={navigateToMain}
              />
              <Profile handleSignOut={handleSignOut} />
            </>
          }
        />
        <Route path="/404" element={<NotFound />} />
      </Routes>
      <Footer />
    </CurrentUserContext.Provider>
  )
}

export default App
