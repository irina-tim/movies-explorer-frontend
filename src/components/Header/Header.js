import './Header.css';
import { useState, useEffect } from "react";
import closeButton from "../../images/header-menu-close.svg";
import burgerMenu from "../../images/header-burger-menu.svg";
import Navigation from "../Navigation/Navigation";

function Header() {
  const isLoggedIn=true; // Temp variable
  const headerClasses = `header ${!isLoggedIn ? 'header_navy-blue' : 'header_dark-grey'}`;
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const tabletWidth = 900;

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  function handleBurgerMenuClick() {
    isMenuOpened ? setIsMenuOpened(false) : setIsMenuOpened(true);
  }

  return (
    <header className={headerClasses}>
      <div className="header__group">
        <div className="header__logo"></div>
        <Navigation 
          isLoggedIn={isLoggedIn}
          width={width}
          tabletWidth={tabletWidth} 
          isMenuOpened={isMenuOpened}
        />
        {(isLoggedIn && width <= tabletWidth) && 
          (<button
            className="header__burger-menu"
            onClick={handleBurgerMenuClick}
            style={{
              backgroundImage: isMenuOpened
                ? `url(${closeButton})`
                : `url(${burgerMenu})`,
              margin: (isMenuOpened && width > 650) 
                ? '2px -15px 0 0'
                : '0 0 10px 0px',
              width: (isMenuOpened && width <= 600) 
                ? '32px'
                : '42px',
              height: (isMenuOpened && width <= 600) 
                ? '32px'
                : '42px',
            }}
          ></button>)     
        }
      </div>
    </header>
  );
}

export default Header;