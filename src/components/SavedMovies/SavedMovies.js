import './SavedMovies.css';
import { useState, useEffect } from 'react';
import * as utils from '../../utils/utils';
import * as errors from '../../utils/errors';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function SavedMovies ({loggedIn, savedMovies, saved, onDeleteMovie, isPreloaderShown, searchError}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchQuery, setLastSearchQuery] = useState();
  const [shortFilmsToggle, setShortFilmsToggle] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(searchError);

  function onSearchSubmit (query) {
    localStorage.setItem('saved-search-query', query);
    setSearchQuery(query);
  }

  function onShortFilmToggle () {
    setShortFilmsToggle(!shortFilmsToggle);
  }

  useEffect(()=> {
    setLastSearchQuery(localStorage.getItem('saved-search-query'));
  }, [searchQuery])

  useEffect(() => {
    if(lastSearchQuery) {
      const searchedMovies = utils.filterBySearchQuery(savedMovies, lastSearchQuery);
      const shortMovies = utils.filterByShortFilms(searchedMovies, shortFilmsToggle);

      setMovies(shortMovies);
    } else {
      setMovies([]);
      setError(errors.BEGIN_SEARCHING);
    }
  }, [savedMovies, searchError, shortFilmsToggle, lastSearchQuery]);

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
            searchError={error}
            searchQuery={searchQuery}
          />
        }
    </main>
    <Footer />
    </>
  )
}

export default SavedMovies;