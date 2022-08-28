import './Profile.css'
import { useState, useEffect, useContext } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { useFormAndValidation } from '../../hooks/useFormAndValidation'

function Profile({ handleSignOut, handleProfileEdit, errorMessage }) {
  const currentUser = useContext(CurrentUserContext)
  const [isEdit, setIsEdit] = useState(false)
  const { values, handleChange, isValid, errors, setValues } =
    useFormAndValidation()

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email })
  }, [currentUser])

  function handleEdit(e) {
    e.preventDefault()
    setIsEdit(true)
  }

  function handleSave(e) {
    e.preventDefault()
    setIsEdit(false)
    console.log('values = ', values)
    handleProfileEdit(values).catch(() =>
      setValues({ name: currentUser.name, email: currentUser.email })
    )
  }

  return (
    <section className="profile">
      <div className="profile__group">
        <form className="profile__container">
          <h2 className="profile__greeting">{`Привет, ${currentUser.name}!`}</h2>
          <div className="profile__info">
            <label className="profile__label">
              Имя
              <input
                id="name"
                name="name"
                type="text"
                className="profile__input"
                value={values.name}
                disabled={!isEdit}
                required
                minLength={2}
                maxLength={30}
                placeholder="Имя"
                autoComplete={'off'}
                onChange={handleChange}
              />
            </label>
            <label className="profile__label">
              E-mail
              <input
                id="email"
                name="email"
                type="email"
                className="profile__input"
                value={values.email}
                disabled={!isEdit}
                required
                placeholder="E-mail"
                autoComplete={'off'}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="profile__buttons">
            <button
              className={`profile__button ${
                isEdit && !isValid && 'profile__button_disabled'
              }`}
              type={isEdit ? 'submit' : 'button'}
              onClick={isEdit ? handleSave : handleEdit}
              disabled={isEdit && !isValid}
            >
              {isEdit ? 'Сохранить' : 'Редактировать'}
            </button>
            <button
              className="profile__button profile__button-sign-out"
              type="button"
              onClick={handleSignOut}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
        <p className="profile__error-from-api">{errorMessage}</p>
      </div>
    </section>
  )
}

export default Profile
