import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList (props) {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cardsCounter, setCardsCounter] = useState(0);
  const [loadMoreCounter, setLoadMoreCounter] = useState(0);
  const [buttonClickCounter, setButtonClickCounter] = useState(0);
  const [movies, setMovies] = useState(props.movies);

  const isShown = movies.length === 0;

  // Функция проверки соответствия текущего размера окна и выводимых карточек
  function toggleMaxCardCount(width, buttonClickCounter, loadMoreCounter) {
      if (width <= 570) {
        setCardsCounter(5 + buttonClickCounter * loadMoreCounter);
        setLoadMoreCounter(2);
      } else if (width > 570 && width <= 860) {
        setCardsCounter(8 + buttonClickCounter * loadMoreCounter);
        setLoadMoreCounter(2);
      } else if (width > 860 ) {
        setCardsCounter(12 + buttonClickCounter * loadMoreCounter);
        setLoadMoreCounter(3);
      }
  }

  // Функция изменения переменной при изменении размера окна
  function handleResize () {
    setWindowWidth(window.innerWidth);
  }

  // Функция добавления новых карточек при клике на кнопку
  function handleLoadMoreMovies () {
    setCardsCounter(prev => prev + loadMoreCounter);
    setButtonClickCounter(prev => prev + 1);
  }

  // Слушатель изменения размеров окна
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Clean-up если компонент не создан
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  // Изменение кол-ва отображаемых карточек при изменении размера окна
  useEffect(() => {

      toggleMaxCardCount(windowWidth, buttonClickCounter, loadMoreCounter);

  }, [windowWidth, buttonClickCounter, loadMoreCounter, movies, props.saved, props.searchError]);

  // Функция вывода нового массива карточек в зависимости от размера окна и счетчика отображаемых карточек
  useEffect(() => {
    setMovies(props.movies.slice(0, cardsCounter));
  }, [cardsCounter, props.movies]);

  return (
    <section className="saved-films page_side_paddings">
      {
        isShown ? <span className="saved-films__error">{props.searchError}</span> : ''
      }
      {
        props.searchQuery.length === 0 ? <span className="saved-films__error">Начните с поиска</span> : ''
      }
      <ul className="saved-films__list">
        {
          movies.map ((movie) => (
            <MoviesCard
              key={movie._id || movie.id}
              movie={movie}
              saved={props.saved}
              onSaveMovie={props.onSaveMovie}
              onDeleteMovie={props.onDeleteMovie}
            />
          ))
        }
      </ul>
      {movies.length < props.movies.length ? <button className="button saved-films__button" onClick={handleLoadMoreMovies}>Еще</button> : '' }
    </section>
  )
}

export default MoviesCardList;