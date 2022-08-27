import { useState, useEffect } from 'react'
import './Auth.css'

function Auth(props) {
  const nameErrorMessage = 'Длина имени должна быть от 2 символов'
  const emailErrorMessage = 'Введите валидный email'
  const passwordErrorMessage = 'Длина пароля не менее 5 символов'
  const [formParams, setFormParams] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const checks = ['typeMismatch', 'tooShort', 'valueMissing']
  const [isNameValid, setIsNameValid] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false)

  useEffect(() => {
    if (isEmailValid && isPasswordValid && (isNameValid || !props.isRegister))
      setIsSubmitButtonEnabled(true)
    else setIsSubmitButtonEnabled(false)
  }, [isEmailValid, isPasswordValid, isNameValid])

  function handleClick() {
    props.isRegister ? props.navigateToLogin() : props.navigateToRegister()
  }

  function onSubmit(e) {
    e.preventDefault()
    const { name, email, password } = formParams
    if (props.isRegister) {
      props.onSubmit({ name, email, password }).catch((err) => {
        console.log(err.message)
      })
    } else {
      props.onSubmit({ email, password }).catch((err) => {
        console.log(err.message)
      })
    }    
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }))
    checkValidity(e)
    if (e.target.name === 'email') setEmail(e.target.value)
    if (e.target.name === 'name') setName(e.target.value)
    if (e.target.name === 'password') setPassword(e.target.value)
  }

  const checkValidity = (e) => {
    const { validity } = e.target
    const checksPassed = checks.filter((check) => validity[check]).length === 0
    if (e.target.name === 'email') setIsEmailValid(checksPassed)
    if (e.target.name === 'password') setIsPasswordValid(checksPassed)
    if (e.target.name === 'name') setIsNameValid(checksPassed)
  }

  return (
    <section className="auth">
      <form className="auth__container" onSubmit={onSubmit}>
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
                  value={name}
                  required
                  minLength="2"
                  placeholder="Имя"
                  onChange={handleChange}
                />
              </label>
              <p
                className={`auth__error ${
                  !isNameValid && name !== '' && 'auth__error_visible'
                }`}
              >
                {nameErrorMessage}
              </p>
            </>
          )}
          <label className="auth__label">
            E-mail
            <input
              id="email"
              name="email"
              type="email"
              className="auth__input"
              value={email}
              required
              placeholder="E-mail"
              onChange={handleChange}
            />
          </label>
          <p
            className={`auth__error ${
              !isEmailValid && email !== '' && 'auth__error_visible'
            }`}
          >
            {emailErrorMessage}
          </p>
          <label className="auth__label">
            Пароль
            <input
              id="password"
              name="password"
              type="password"
              className="auth__input"
              value={password}
              required
              placeholder="Пароль"
              onChange={handleChange}
              minLength="5"
              maxLength="15"
            />
          </label>
          <p
            className={`auth__error ${
              !isPasswordValid && password !== '' && 'auth__error_visible'
            }`}
          >
            {passwordErrorMessage}
          </p>
        </div>
        <p className="auth__error-from-api">{props.errorMessage}</p>
        <button
          className={`auth__button-auth ${
            !props.isRegister && 'auth__button-login'
          } ${!isSubmitButtonEnabled && 'auth__button-auth_disabled'}`}
          type="submit"
          disabled={!isSubmitButtonEnabled}
        >
          {props.authButtonText}
        </button>
        <div className="auth__sign-out-group">
          <p className="auth__paragraph">{props.paragraphText}</p>
          <button
            className="auth__button-small"
            type="button"
            onClick={handleClick}
          >
            {props.smallButtonText}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Auth
