import './Register.css';

function Register() {
    const errorMessage = "Что-то пошло не так...";
  return (
    <section className="register">
        <form className="register__container">
            <div className="register__info">
                    <label className="register__label">
                        Имя
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="register__input"
                            value="Виталий"
                            required
                            minLength={2}
                            placeholder='Имя'
                        />                    
                    </label>
                    <p className='register__error'>{errorMessage}</p>
                    <label className="register__label">
                        E-mail
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="register__input"
                            value="pochta@yandex.ru"
                            required
                            placeholder='E-mail'
                        />
                    </label>
                    <p className='register__error'>{errorMessage}</p>
                    <label className="register__label">
                        Пароль
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="register__input"
                            value="12345"
                            required
                            placeholder='Пароль'
                        />
                    </label>
                    <p className='register__error'>{errorMessage}</p>
                </div>
                <button className="register__button-register" type="submit">Зарегистрироваться</button>
                <div className="register__sign-out-group">
                    <p className="register__paragraph">Уже зарегистрированы?</p>
                    <button className="register__button-exit">Войти</button>
                </div>
            </form>       
    </section>
  )
}

export default Register;