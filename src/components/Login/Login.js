import './Login.css'
import Auth from '../Auth/Auth'

function Login(props) {
  return (
    <Auth
      authButtonText="Войти"
      paragraphText="Ещё не зарегистрированы?"
      smallButtonText="Регистрация"
      navigateToRegister={props.navigateToRegister}
    />
  )
}

export default Login
