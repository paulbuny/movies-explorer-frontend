import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './NavTab.css';

function NavTab (props) {
  const [burgerMenu, setBurgerMenu] = useState(false);

  function toggleBurgerMenu () {
    setBurgerMenu(!burgerMenu);
  }

  return (
    <div className='header__nav'>

      {props.loggedIn ?
        <>
          <Link to="/profile" className="link header__link header__link_authorized">Аккаунт</Link>
          <button className="button header__burger-btn" onClick={toggleBurgerMenu}></button>
          <div className={burgerMenu ? 'menu menu__display_active' : 'menu menu__display_hidden' }>
            <div className="menu__main-wrapper">
              <button className="button menu__close-btn" onClick={toggleBurgerMenu}></button>
              <ul className="menu__nav-wrapper">
                <li className="menu__nav-item"><Link className="link menu__link" to="/">Главная</Link></li>
                <li className="menu__nav-item"><NavLink activeClassName="menu__link_active" className="link menu__link" to="/movies">Фильмы</NavLink></li>
                <li className="menu__nav-item"><NavLink activeClassName="menu__link_active" className="link menu__link" to="/saved-movies">Сохранённые фильмы</NavLink></li>
              </ul>
            </div>
            <Link to="/profile" className="link menu__link menu__link_authorized">Аккаунт</Link>
          </div>
        </>
        :
        <>
          <Link to="/signup" className="link header__link">Регистрация</Link>
          <Link to="/signin" className="link header__link header__link_highlighted">Войти</Link>
        </>
      }
    </div>
  )
}

export default NavTab;