import './Header.css';

function Header() {
  const isLoggedIn=false; // Temp variable
  const headerClasses = `header ${isLoggedIn ? 'header_navy-blue' : 'header_dark-grey'}`;
  return (
    <header className={headerClasses}>
      <div className="header__group">
        <div className="header__logo"></div>
        {isLoggedIn && 
          (<div className="header__buttons">
            <button className="header__button">Регистрация</button>
            <button className="header__button header__button_active">Войти</button>
          </div>)
        }
        {!isLoggedIn && 
          (<div className="header__buttons">
            <button className="header__button header__button-films">Фильмы</button>
            <button className="header__button header__button-films">Сохранённые фильмы</button>
            <div className="header__account-group">
              <button className="header__button header__button-account">Аккаунт</button>
              <div className="header__account-image"></div>
            </div>
          </div>)
        }
      </div>
    </header>
  );
}

export default Header;