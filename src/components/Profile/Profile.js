import './Profile.css'
import { useState, useEffect, useContext } from 'react'
import { CurrentUserContext } from "../../contexts/CurrentUserContext"

function Profile({ handleSignOut, handleProfileEdit }) {
  const currentUser = useContext(CurrentUserContext);
  const errorMessage = ''
  const [isEdit, setIsEdit] = useState(false)
  const [userData, setUserData] = useState({});
  const isValid = true;

  function handleEdit(e) {
    e.preventDefault();
    setIsEdit(true);
  }

  function handleSave(e) {
    e.preventDefault();
    setIsEdit(false);
    handleProfileEdit(userData);
  }

  const handleChange = (inputData) => {
    setUserData({ ...userData, ...inputData });
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
                value={isEdit && userData.name || currentUser.name}
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
                value={isEdit && userData.email || currentUser.email}
                disabled={!isEdit}
                required
                placeholder="E-mail"
                autoComplete={'off'}
                onChange={handleChange}
              />
            </label>
          </div>
          <p className="profile__error">{errorMessage}</p>
          <div className="profile__buttons">
            <button 
              className="profile__button"
              type={isEdit ? "submit" : "button"} 
              onClick={isEdit ? handleSave : handleEdit}
              disabled={isEdit && !isValid}
            >
              {isEdit ? "Сохранить" : "Редактировать"}
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
      </div>
    </section>
  )
}

export default Profile
