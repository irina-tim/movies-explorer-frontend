import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__group">
        <div className="header__logo"></div>
        <div className="header__buttons">
          <button className="header__button">Регистрация</button>
          <button className="header__button header__button_active">Войти</button>
        </div>
      </div>
    </header>
  );
}

export default Header;