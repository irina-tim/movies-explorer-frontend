import './Login.css'
import Auth from '../Auth/Auth'

function Login(props) {
  return (
    <Auth
      authButtonText="Войти"
      paragraphText="Ещё не зарегистрированы?"
      smallButtonText="Регистрация"
      navigateToRegister={props.navigateToRegister}
      navigateToMain={props.navigateToMain}
      onSubmit={props.handleLogin}
      errorMessage={props.errorMessage}
      isLoggedIn={props.isLoggedIn}
    />
  )
}

export default Login
