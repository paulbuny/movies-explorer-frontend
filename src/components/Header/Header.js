import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import NavTab from '../NavTab/NavTab';

function Header(props) {
  return(
    <header className={props.loggedIn ? "header page_side_paddings" : "header header__landing_color page_side_paddings"}>
      <Link to="/">
        <img src={logo} alt="Логотип MovieExplorer" className="header__logo" />
      </Link>
      {props.loggedIn ?
      <div className="header__wrapper">
        <Link to="/movies" className="link header__link-movies">Фильмы</Link>
        <Link to="/saved-movies" className="link header__link-movies header__link-movies_current">Сохраненные фильмы</Link>
      </div> :
      <div className="header__wrapper">
      </div>
      }
      <NavTab history={props.history} loggedIn={props.loggedIn}/>
    </header>
  )
}

export default Header;