import './Navigation.css'
import { useLocation } from 'react-router-dom'

function Navigation(props) {
  const { pathname } = useLocation()
  function openProfile() {
    props.navigateToProfile()
    props.closeMenu()
  }
  return (
    <>
      {!props.isLoggedIn && (
        <div className="navigation__buttons">
          <button
            className="navigation__button"
            onClick={() => props.navigateToRegister()}
            type="button"
          >
            Регистрация
          </button>
          <button
            className="navigation__button navigation__button_active"
            onClick={() => props.navigateToLogin()}
            type="button"
          >
            Войти
          </button>
        </div>
      )}
      {props.isLoggedIn && props.width > props.tabletWidth && (
        <div className="navigation__buttons">
          <button
            className={`navigation__button navigation__button-films ${
              pathname === '/movies' && 'navigation__button-films_active'
            }`}
            onClick={() => props.navigateToMovies()}
            type="button"
          >
            Фильмы
          </button>
          <button
            className={`navigation__button navigation__button-films ${
              pathname === '/saved-movies' && 'navigation__button-films_active'
            }`}
            onClick={() => props.navigateToSavedMovies()}
            type="button"
          >
            Сохранённые фильмы
          </button>
          <div className="navigation__account-group" onClick={openProfile}>
            <button
              className="navigation__button navigation__button-account"
              type="button"
            >
              Аккаунт
            </button>
            <div className="navigation__account-image"></div>
          </div>
        </div>
      )}
      {props.isLoggedIn &&
        props.width <= props.tabletWidth &&
        props.isMenuOpened && (
          <div className="navigation__page-blackout">
            <div className="navigation__buttons-group">
              <div className="navigation__nav-buttons-group">
                <button
                  className={`navigation__button-right ${
                    pathname === '/' && 'navigation__button-right_active'
                  }`}
                  onClick={() => {
                    props.navigateToMain()
                    props.closeMenu()
                  }}
                  type="button"
                >
                  Главная
                </button>
                <button
                  className={`navigation__button-right ${
                    pathname === '/movies' && 'navigation__button-right_active'
                  }`}
                  onClick={() => {
                    props.navigateToMovies()
                    props.closeMenu()
                  }}
                  type="button"
                >
                  Фильмы
                </button>
                <button
                  className={`navigation__button-right ${
                    pathname === '/saved-movies' &&
                    'navigation__button-right_active'
                  }`}
                  onClick={() => {
                    props.navigateToSavedMovies()
                    props.closeMenu()
                  }}
                  type="button"
                >
                  Сохранённые фильмы
                </button>
              </div>
              <div
                className="navigation__account-group-right"
                onClick={openProfile}
              >
                <button
                  className="navigation__button-right navigation__button-account-right"
                  type="button"
                  onClick={openProfile}
                >
                  Аккаунт
                </button>
                <div
                  className="navigation__account-image"
                  onClick={openProfile}
                ></div>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default Navigation
