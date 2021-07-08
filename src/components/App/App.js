import './App.css';
import { Switch, Route } from 'react-router-dom';
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
  let history = useHistory();

  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(`Bearer ${localStorage.getItem('token')}`);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);
  const [shortFilmsToggle, setShortFilmsToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchQuery, setLastSearchQuery] = useState();
  const [searchError, setSearchError] = useState();
  const [popupErrMessage, setPopupErrMessage] = useState();
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Ниже код относящийся к данным пользователя
  useEffect(() => {

    if (token) {
      mainApi.getCurrentUser(token)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email,
        })

        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => setPopupErrMessage(utils.getErrors(err)));
    }
  }, [history, token]);

  function onRegister (name, email, password) {
    console.log(name);
    console.log(email);
    console.log(password);
    mainApi.signUp(name, email, password)
      .then(() => {
        history.push('/signin');
      })
      .catch((err) => setPopupErrMessage(utils.getErrors(err)));
  }

  function onLogin (email, password) {
    mainApi.signIn(email, password)
    .then((res) => {
      if (res) {
        localStorage.setItem('token', res.token);
        setToken(`Bearer ${res.token}`);
        history.push('/movies');
      }
    })
    .catch((err) => setPopupErrMessage(utils.getErrors(err)));
  }

  function onLogout () {
    localStorage.removeItem('token');
    localStorage.removeItem('search-query');
    setLastSearchQuery('');
    setCurrentUser({});
    setSavedMovies([]);
    setMovies([]);
    setLoggedIn(false);
    history.push('/');
    localStorage.clear();
  }

  function onProfileInfoChange (name, email) {
    mainApi.updateUserProfile(name, email, token)
    .then((res) => {
      setCurrentUser({
        name: res.name,
        email: res.email,
      });
      historyPushBackward();
    })
    .catch((err) => setPopupErrMessage(utils.getErrors(err)));
  }

  // Ниже код относящийся к фильмам

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

  useEffect(() =>{
      mainApi.getMovies(token)
      .then((savedMovies) => {

        localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
        setSavedMovies(savedMovies);

        return savedMovies;
      })
      .then((savedMovies) => {
        setIsPreloaderShown(true);

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
            setPopupErrMessage(utils.getErrors(err));
          })
          .finally(() => {
            setIsPreloaderShown(false);
          });
      })
      .catch((err) => setPopupErrMessage(utils.getErrors(err)));

  }, [loggedIn, token, searchQuery]);

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
    .catch((err) => setPopupErrMessage(utils.getErrors(err)));
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

  // Фунцкция для 404-ой страницы по возврату назад по истории навигации
  function historyPushBackward () {
    history.goBack();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <PopupMessage message={popupErrMessage} />
      <div className="page">
        <Switch>
          <Route exact path='/'>
            <Main loggedIn={loggedIn} />
          </Route>
          {loggedIn && (<ProtectedRoute exact path='/movies'
                          loggedIn={loggedIn}
                          component={Movies}
                          isPreloaderShown={isPreloaderShown}
                          searchError={searchError}
                          searchQuery={searchQuery}
                          setSearchError={setSearchError}
                          onShortFilmToggle={onShortFilmToggle}
                          onSaveMovie={onSaveMovie}
                          onSearchSubmit={onSearchSubmit}
                          filteredMovies={filteredMovies}
                          saved={false}
                          />)}
          {loggedIn && (<ProtectedRoute exact path='/saved-movies'
                          loggedIn={loggedIn}
                          component={SavedMovies}
                          isPreloaderShown={isPreloaderShown}
                          searchError={searchError}
                          setSearchError={setSearchError}
                          onDeleteMovie={onDeleteMovie}
                          savedMovies={savedMovies}
                          saved={true}
          />)}
          {loggedIn && (<ProtectedRoute exact path='/profile'
                          loggedIn={loggedIn}
                          component={Profile}
                          currentUser={currentUser}
                          onLogout={onLogout}
                          onProfileInfoChange={onProfileInfoChange}
          />)}
          <Route exact path='/signup'>
            <Register onRegister={onRegister} />
          </Route>
          <Route exact path='/signin'>
            <Login onLogin={onLogin} />
          </Route>
          <Route exact path='*'>
            <NotFound onClick={historyPushBackward} />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
