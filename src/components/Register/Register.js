import './Register.css'
import Auth from '../Auth/Auth'

function Register(props) {
  return (
    <Auth
      authButtonText="Зарегистрироваться"
      paragraphText="Уже зарегистрированы?"
      smallButtonText="Войти"
      isRegister="true"
      navigateToLogin={props.navigateToLogin}
      onSubmit={props.handleRegister}
      errorMessage={props.errorMessage}
    />
  )
}

export default Register
