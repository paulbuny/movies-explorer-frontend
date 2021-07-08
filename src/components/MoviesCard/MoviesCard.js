import { useState } from 'react';
import './MoviesCard.css';
import * as utils from '../../utils/utils';

function MoviesCard ({movie, saved, onSaveMovie, onDeleteMovie}) {

  const [isSaved, setIsSaved] = useState(movie.isSaved);

  function handleOnLikeClick () {
    if (!movie.isSaved) {
      onSaveMovie(movie);
      setIsSaved((prev) => !prev);
    }
  }

  function handleOnRemoveClick () {
    onDeleteMovie(movie._id);
  }

  return (
    <li className="movie">
      <a href={movie.trailer || movie.trailerLink} rel="noreferrer" target="_blank">
        <img src={movie.image.url || movie.image } alt={movie.nameRU} className="movie__cover" />
      </a>
      <div className="movie__text-wrapper">
        <p className="movie__title">{movie.nameRU}</p>
        {saved ?
                <button className="button movie__remove-btn movie__remove-btn_visible" onClick={handleOnRemoveClick}></button> :
                <button className={isSaved ? "button movie__like movie__like_clicked" : "button movie__like" } onClick={handleOnLikeClick}></button>
        }
        <p className="movie__duration">{utils.convertToCorrectTiming(movie.duration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard;