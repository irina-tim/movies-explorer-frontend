import { Navigate } from 'react-router-dom'
import Preloader from '../Movies/Preloader/Preloader'

const PrivateRoute = ({ component: Component, ...props }) => {
  if (props.loggedIn === undefined) return <Preloader />
  return (
    <>
      {props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />}
    </>
  )
}

export default PrivateRoute
