import { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';



function MoviesCardList (props) {
  const [MovieList, setMovieList] = useState(props.movieList);

  return (
    <section className="saved-films page_side_paddings">
      <ul className="saved-films__list">
        {
          MovieList.map ((item) => (
            <MoviesCard
            key={item.id}
            title={item.title}
            duration={item.duration}
            cover={item.cover}
            liked={item.liked}
            saved={props.saved}
            />
          ))
        }
      </ul>
      {MovieList.length < 12 ? '' : <button className="button saved-films__button">Еще</button> }
    </section>
  )
}

export default MoviesCardList;