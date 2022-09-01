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
      navigateToMain={props.navigateToMain}
      onSubmit={props.handleRegister}
      errorMessage={props.errorMessage}
      isLoggedIn={props.isLoggedIn}
    />
  )
}

export default Register
