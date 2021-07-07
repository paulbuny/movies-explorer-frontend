import './SavedMovies.css';
import { useState, useEffect } from 'react';
import * as utils from '../../utils/utils';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function SavedMovies ({loggedIn, savedMovies, saved, onDeleteMovie, isPreloaderShown, searchError}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [shortFilmsToggle, setShortFilmsToggle] = useState(false);
  const [movies, setMovies] = useState([]);

  function onSearchSubmit (query) {
      setSearchQuery(query);
  }

  function onShortFilmToggle () {
    setShortFilmsToggle(!shortFilmsToggle);
  }

  useEffect(() => {
      const searchedMovies = utils.filterBySearchQuery(savedMovies, searchQuery);
      const shortMovies = utils.filterByShortFilms(searchedMovies, shortFilmsToggle);

      setMovies(shortMovies);

      if(searchQuery.length === 0) {
        setMovies([]);
      }
  }, [savedMovies, shortFilmsToggle, searchQuery]);

  return(
    <>
    <Header loggedIn={loggedIn} />
    <main className="movies">
      <SearchForm onShortFilmToggle={onShortFilmToggle} onSearchSubmit={onSearchSubmit} />
        {
          isPreloaderShown ?
          <Preloader /> :
          <MoviesCardList
            saved={saved}
            movies={movies}
            onDeleteMovie={onDeleteMovie}
            searchError={searchError}
            searchQuery={searchQuery}
          />
        }
    </main>
    <Footer />
    </>
  )
}

export default SavedMovies;