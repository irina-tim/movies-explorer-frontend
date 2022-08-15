import './Auth.css'

function Auth(props) {
  const errorMessage = 'Что-то пошло не так...'
  function handleClick() {
    props.isRegister ? props.navigateToLogin() : props.navigateToRegister()
  }
  return (
    <section className="auth">
      <form className="auth__container">
        <div className="auth__info">
          {props.isRegister && (
            <>
              <label className="auth__label">
                Имя
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="auth__input"
                  value="Виталий"
                  required
                  minLength={2}
                  placeholder="Имя"
                />
              </label>
              <p className="auth__error">{errorMessage}</p>
            </>
          )}
          <label className="auth__label">
            E-mail
            <input
              id="email"
              name="email"
              type="email"
              className="auth__input"
              value="pochta@yandex.ru"
              required
              placeholder="E-mail"
            />
          </label>
          <p className="auth__error">{errorMessage}</p>
          <label className="auth__label">
            Пароль
            <input
              id="password"
              name="password"
              type="password"
              className="auth__input"
              value="12345"
              required
              placeholder="Пароль"
            />
          </label>
          <p className="auth__error">{errorMessage}</p>
        </div>
        <button
          className={`auth__button-auth ${
            !props.isRegister && 'auth__button-login'
          }`}
          type="submit"
        >
          {props.authButtonText}
        </button>
        <div className="auth__sign-out-group">
          <p className="auth__paragraph">{props.paragraphText}</p>
          <button className="auth__button-small" onClick={handleClick}>
            {props.smallButtonText}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Auth
