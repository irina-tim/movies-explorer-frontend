import './Navigation.css'

function Navigation(props) {
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
            className="navigation__button navigation__button-films navigation__button-films_active"
            onClick={() => props.navigateToMovies()}
            type="button"
          >
            Фильмы
          </button>
          <button
            className="navigation__button navigation__button-films"
            onClick={() => props.navigateToSavedMovies()}
            type="button"
          >
            Сохранённые фильмы
          </button>
          <div
            className="navigation__account-group"
            onClick={() => props.navigateToProfile()}
          >
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
                  className="navigation__button-right"
                  onClick={() => props.navigateToMain()}
                  type="button"
                >
                  Главная
                </button>
                <button
                  className="navigation__button-right navigation__button-right_active"
                  onClick={() => props.navigateToMovies()}
                  type="button"
                >
                  Фильмы
                </button>
                <button
                  className="navigation__button-right"
                  onClick={() => props.navigateToSavedMovies()}
                  type="button"
                >
                  Сохранённые фильмы
                </button>
              </div>
              <div
                className="navigation__account-group-right"
                onClick={() => props.navigateToProfile()}
              >
                <button
                  className="navigation__button-right navigation__button-account-right"
                  type="button"
                  onClick={() => props.navigateToProfile()}
                >
                  Аккаунт
                </button>
                <div
                  className="navigation__account-image"
                  onClick={() => props.navigateToProfile()}
                ></div>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default Navigation
