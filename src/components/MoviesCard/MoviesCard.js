import { useState } from 'react';
import './MoviesCard.css';

function MoviesCard (props) {
  const [removeBtn, setRemoveBtn] = useState(false);

  function handleOnMouseEnter () {
    setRemoveBtn(true);
  }

  function handleOnMouseLeave () {
    setRemoveBtn(false);
  }

  return (
    <li className="movie" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
      <img src={props.cover} alt={props.title} className="movie__cover" />
      <div className="movie__text-wrapper">
        <p className="movie__title">{props.title}</p>
        {props.saved ?
                <button className={removeBtn ? "button movie__remove-btn movie__remove-btn_visible" : 'button movie__remove-btn movie__remove-btn_hidden' }></button> :
                <button className={props.liked ? "button movie__like movie__like_clicked" : "button movie__like" }></button>
        }
        <p className="movie__duration">{props.duration}</p>
      </div>
    </li>
  )
}

export default MoviesCard;