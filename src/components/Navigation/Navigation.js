import './Navigation.css';

function Navigation(props) {
    return(
        <>
            {(!props.isLoggedIn && props.width > props.tabletWidth) &&
                (<div className="navigation__buttons">
                    <button className="navigation__button">Регистрация</button>
                    <button className="navigation__button navigation__button_active">Войти</button>
                </div>)
            }
            {(props.isLoggedIn && props.width > props.tabletWidth) &&
                (<div className="navigation__buttons">
                <button className="navigation__button navigation__button-films navigation__button-films_active">Фильмы</button>
                <button className="navigation__button navigation__button-films">Сохранённые фильмы</button>
                <div className="navigation__account-group">
                    <button className="navigation__button navigation__button-account">Аккаунт</button>
                    <div className="navigation__account-image"></div>
                </div>
                </div>)
            }
            {(props.isLoggedIn && props.width <= props.tabletWidth && props.isMenuOpened) && 
                (<div className="navigation__page-blackout">
                    <div className="navigation__buttons-group">
                        <div className="navigation__nav-buttons-group">
                            <button className="navigation__button-right">Главная</button>
                            <button className="navigation__button-right navigation__button-right_active">Фильмы</button>
                            <button className="navigation__button-right">Сохранённые фильмы</button>
                        </div>
                        <div className="navigation__account-group-right">
                            <button className="navigation__button-right navigation__button-account-right">Аккаунт</button>
                            <div className="navigation__account-image"></div>
                        </div>
                    </div>
                </div>)     
            }
        </>
    );
}

export default Navigation;