import { useState } from "react";
import Header from "../Header/Header";
import './Profile.css';

function Profile(props) {
  const [currentUser, setCurrentUser] = useState(props.currentUser);

  return (
    <>
      <Header history={props.history} loggedIn={props.loggedIn}/>
        <main>
          <section className="profile">
            <h2 className="profile__title">Привет, {'Виталий'}!</h2>
            <form className="profile__form" id="profile__form" name="profile__form">
              <div className="profile__input-wrapper">
              <label htmlFor="profile__name" className="profile__label">Имя</label>
              <input className="profile__input" id="profile__name" name="profile__name" defaultValue={currentUser.name} />
              </div>
              <div className="profile__input-wrapper">
              <label htmlFor="profile__email" className="profile__label">Email</label>
              <input className="profile__input" id="profile__email" name="profile__email" defaultValue={currentUser.email} />
              </div>
            </form>
            <div className="profile__footer">
              <button className="button profile__button" form="profile__form" type="submit">Редактировать</button>
              <button className="button profile__button profile__button_logout">Выйти из аккаунта</button>
            </div>
          </section>
        </main>
    </>
  )
}

export default Profile;