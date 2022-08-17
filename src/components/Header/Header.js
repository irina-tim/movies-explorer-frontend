import './Header.css'
import { useState, useEffect } from 'react'
import closeButton from '../../images/header-menu-close.svg'
import burgerMenu from '../../images/header-burger-menu.svg'
import Navigation from '../Navigation/Navigation'

function Header(props) {
  const isAuth = props.isRegisterPage || props.isLoginPage
  const headerClasses = `header ${
    !props.isLoggedIn ? 'header_navy-blue' : 'header_dark-grey'
  }`
  const headerGroupClasses = !isAuth ? 'header__group' : 'header__group-auth'
  const headerLogoClasses = !isAuth ? 'header__logo' : 'header__logo-auth'
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const tabletWidth = 900
  const greeting = props.isRegisterPage ? 'Добро пожаловать!' : 'Рады видеть!'

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])

  function handleBurgerMenuClick() {
    isMenuOpened ? setIsMenuOpened(false) : setIsMenuOpened(true)
  }

  return (
    <header className={headerClasses}>
      <div className={headerGroupClasses}>
        <div
          className={headerLogoClasses}
          onClick={() => props.navigateToMain()}
        ></div>
        {!isAuth && (
          <Navigation
            isLoggedIn={props.isLoggedIn}
            width={width}
            tabletWidth={tabletWidth}
            isMenuOpened={isMenuOpened}
            navigateToRegister={props.navigateToRegister}
            navigateToLogin={props.navigateToLogin}
            navigateToMovies={props.navigateToMovies}
            navigateToSavedMovies={props.navigateToSavedMovies}
            navigateToProfile={props.navigateToProfile}
            navigateToMain={props.navigateToMain}
          />
        )}
        {props.isLoggedIn && width <= tabletWidth && !isAuth && (
          <button
            className="header__burger-menu"
            onClick={handleBurgerMenuClick}
            type="button"
            style={{
              backgroundImage: isMenuOpened
                ? `url(${closeButton})`
                : `url(${burgerMenu})`,
              margin:
                isMenuOpened && width > 650 ? '2px -15px 0 0' : '0 0 10px 0px',
              width: isMenuOpened && width <= 600 ? '32px' : '42px',
              height: isMenuOpened && width <= 600 ? '32px' : '42px',
            }}
          ></button>
        )}
        {isAuth && (
          <h2
            className={
              props.isRegisterPage
                ? 'header__auth-greeting'
                : 'header__login-greeting'
            }
          >
            {greeting}
          </h2>
        )}
      </div>
    </header>
  )
}

export default Header
