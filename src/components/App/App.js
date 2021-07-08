import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import * as utils from '../../utils/utils';
import * as errors from '../../utils/errors';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import PopupMessage from '../PopupMessage/PopupMessage';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);
  const [shortFilmsToggle, setShortFilmsToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchQuery, setLastSearchQuery] = useState();
  const [searchError, setSearchError] = useState();
  const [popupErrMessage, setPopupErrMessage] = useState([false, '']);
  const [authMessage, setAuthMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  let history = useHistory();
  const location = useLocation();
  const path = location.pathname

  // Ниже код относящийся к данным пользователя
  function onLogin (email, password) {
    mainApi.signIn(email, password)
    .then((res) => {
      if (res) {
        localStorage.setItem('token', res.token);
        setToken(res.token);
        history.push('/movies');
      }
    })
    .catch((err) => setAuthMessage([true, utils.getErrors(err)]));
  }

  function onRegister (name, email, password) {
    mainApi.signUp(name, email, password)
      .then((res) => {
        if(res.email) {
          onLogin(email, password)
        }
      })
      .catch((err) => setAuthMessage([true, utils.getErrors(err)]));
  }

  function onProfileInfoChange (name, email) {

    mainApi.updateUserProfile(name, email, token)
    .then((res) => {
      setCurrentUser({
        name: res.name,
        email: res.email,
      });
      setPopupErrMessage([true, 'Данные пользователя успешно обновлены!']);
    })
    .catch((err) => setPopupErrMessage([true, utils.getErrors(err)]));
  }

  function onLogout () {
    setLastSearchQuery('');
    setCurrentUser({});
    setSavedMovies([]);
    setMovies([]);
    setLoggedIn(false);

    localStorage.clear();

    history.push('/');
  }

  // Ниже код относящийся к фильмам

  function onSaveMovie (movie) {

    mainApi.addMovie({
      id: movie.id,
      country: movie.country,
      description: movie.description,
      director: movie.director,
      duration: movie.duration,
      image: movie.image.url,
      thumbnail: movie.image.formats.thumbnail.url,
      nameEN: movie.nameEN,
      nameRU: movie.nameRU,
      trailer: movie.trailerLink,
      year: movie.year,
      token: token
    })
    .then((res) => {
      setSavedMovies([...savedMovies, res]);
    })
    .catch((err) => setPopupErrMessage([true, utils.getErrors(err)]));
  }

  function onDeleteMovie (id) {
    mainApi.deleteMovie(id, token)
    .then((res) => {
      const savedMoviesCopy = savedMovies.filter((savedMovie) => savedMovie._id !== res._id);
      setSavedMovies(savedMoviesCopy);
    });
  }

  function onSearchSubmit(query) {
    localStorage.setItem('search-query', query);
    setSearchQuery(query);
  }

  function onShortFilmToggle (isChecked) {
    setShortFilmsToggle(isChecked);
  }

  useEffect(() => {
    setLastSearchQuery(localStorage.getItem('search-query'));
  }, [searchQuery]);

  useEffect(() => {

    if (lastSearchQuery) {
      const searchedMovies = utils.filterBySearchQuery(movies, lastSearchQuery);
      const shortMovies = utils.filterByShortFilms(searchedMovies, shortFilmsToggle);

      setSearchError(errors.NOT_FOUND);
      setFilteredMovies(utils.checkForSavedMovies(shortMovies, savedMovies));
    } else {
      setSearchError(errors.BEGIN_SEARCHING);
      setFilteredMovies([]);
    }

  }, [movies, lastSearchQuery, shortFilmsToggle, savedMovies]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      mainApi.getCurrentUser(token)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email,
        })

        setLoggedIn(true);
        history.push(path)
      })
      .catch((err) => setPopupErrMessage([true, utils.getErrors(err)]));
    } else {
      localStorage.removeItem('token');
    }
  }, [history, path]);

  useEffect(() =>{

      mainApi.getMovies(token)
      .then((savedMovies) => {

        localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
        setSavedMovies(savedMovies);

        return savedMovies;
      })
      .then((savedMovies) => {
        setIsPreloaderShown(true);
        const localySavedMovies = JSON.parse(localStorage.getItem('movies'));

        if(!localySavedMovies) {

          moviesApi.getMovies()
          .then((movies) => {
            const newMovies = movies.map(movie => {
              const movieImage = utils.convertImagesUrls(movie.image.url);
              const movieThumbnail = utils.convertImagesUrls(movie.image.formats.thumbnail.url);

              movie.image.url = movieImage;
              movie.image.formats.thumbnail.url = movieThumbnail;

              return movie;
            })

            localStorage.setItem('movies', JSON.stringify(movies));
            setMovies(utils.checkForSavedMovies(newMovies, savedMovies));
            setSearchError('');
          })
          .catch((err) => {
            setSearchError(errors.ERROR_500);
            setPopupErrMessage(true, utils.getErrors(err));
          })
          .finally(() => {
            setIsPreloaderShown(false);
          });

        } else {

          setIsPreloaderShown(false);
          setSearchError('');

          setMovies(utils.checkForSavedMovies(localySavedMovies, savedMovies));

        }
      })
      .catch((err) => setPopupErrMessage([true, utils.getErrors(err)]));

  }, [loggedIn, token, searchQuery]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path='/'>
            <Main loggedIn={loggedIn} />
          </Route>
          {loggedIn && <ProtectedRoute path='/movies'
                          component={Movies}
                          redirect="/"
                          loggedIn={loggedIn}
                          isPreloaderShown={isPreloaderShown}
                          searchError={searchError}
                          searchQuery={searchQuery}
                          setSearchError={setSearchError}
                          onShortFilmToggle={onShortFilmToggle}
                          onSaveMovie={onSaveMovie}
                          onSearchSubmit={onSearchSubmit}
                          filteredMovies={filteredMovies}
                          saved={false}
                          />}
          {loggedIn && <ProtectedRoute path='/saved-movies'
                          component={SavedMovies}
                          redirect="/"
                          loggedIn={loggedIn}
                          isPreloaderShown={isPreloaderShown}
                          searchError={searchError}
                          setSearchError={setSearchError}
                          onDeleteMovie={onDeleteMovie}
                          savedMovies={savedMovies}
                          saved={true}
          />}
          {loggedIn && <ProtectedRoute path='/profile'
                          component={Profile}
                          redirect="/"
                          loggedIn={loggedIn}
                          currentUser={currentUser}
                          onLogout={onLogout}
                          onProfileInfoChange={onProfileInfoChange}
          />}

          {!loggedIn && <Route path='/signup'>
            <Register onRegister={onRegister} authMessage={authMessage}/>
          </Route>}

          {!loggedIn && <Route path='/signin'>
            <Login onLogin={onLogin} authMessage={authMessage}/>
          </Route>}

          <Route path='*'>
            <NotFound />
          </Route>

        </Switch>
      <PopupMessage message={popupErrMessage} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
