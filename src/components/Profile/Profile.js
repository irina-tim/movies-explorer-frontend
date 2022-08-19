import './Profile.css'

function Profile() {
  const isDisabled = true
  const errorMessage = ''

  return (
    <section className="profile">
      <div className="profile__group">
        <form className="profile__container">
          <h2 className="profile__greeting">Привет, Виталий!</h2>
          <div className="profile__info">
            <label className="profile__label">
              Имя
              <input
                id="name"
                name="name"
                type="text"
                className="profile__input"
                value="Виталий"
                disabled={isDisabled}
                required
                minLength={2}
                placeholder="Имя"
              />
            </label>
            <label className="profile__label">
              E-mail
              <input
                id="email"
                name="email"
                type="email"
                className="profile__input"
                value="pochta@yandex.ru"
                disabled={isDisabled}
                required
                placeholder="E-mail"
              />
            </label>
          </div>
          <p className="profile__error">{errorMessage}</p>
          <div className="profile__buttons">
            <button className="profile__button" type="button">
              Редактировать
            </button>
            <button
              className="profile__button profile__button-sign-out"
              type="button"
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Profile
