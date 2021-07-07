import Header from "../Header/Header";
import { useState, useEffect, useContext } from "react";
import { useFormValidation } from "../../utils/formValidation";
import './Profile.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [isActive, setIsActive] = useState(true);

  const {values, errors, isValid, handleOnChange, setValues} = useFormValidation();

  function handleSubmit (e) {
    e.preventDefault();
    props.onProfileInfoChange(values.name, values.email);
    setIsActive(false);
  }

  function handleOnValueChange (event) {
    setIsActive(true);
    handleOnChange(event);
  }

  useEffect(() => {
    setValues(currentUser)
  }, [currentUser, setValues]);

  return (
    <>
      <Header loggedIn={props.loggedIn}/>
        <main>
          <section className="profile">
            <h2 className="profile__title">Привет, {props.currentUser.name}!</h2>
            <form className="profile__form"
                  id="profile"
                  name="profile"
                  onSubmit={handleSubmit}
                  noValidate={true}
            >
              <div className="profile__input-wrapper">
              <label htmlFor="profile__name" className="profile__label">Имя</label>
              <input className="profile__input"
                    id="name"
                    name="name"
                    value={values.name || ''}
                    required
                    minLength="2"
                    maxLength="30"
                    onChange={handleOnValueChange}
              />
              </div>
              <span className="profile__error">{errors.name}</span>
              <div className="profile__input-wrapper">
              <label htmlFor="profile__email" className="profile__label">Email</label>
              <input className="profile__input"
                    type="email"
                    id="email"
                    name="email"
                    value={values.email || ''}
                    required
                    minLength="3"
                    maxLength="30"
                    onChange={handleOnValueChange}
              />
              </div>
              <span className="profile__error">{errors.email}</span>
            </form>
            <div className="profile__footer">
              <button className="button profile__button" form="profile" type="submit" disabled={!isValid && isActive}>Редактировать</button>
              <button className="button profile__button profile__button_logout" onClick={props.onLogout}>Выйти из аккаунта</button>
            </div>
          </section>
        </main>
    </>
  )
}

export default Profile;