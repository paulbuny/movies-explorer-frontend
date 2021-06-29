import './App.css';
import { Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

function App() {
  let history = useHistory();

  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const [token, setToken] = useState(`Bearer ${localStorage.getItem('token')}`);

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
    }
  }, [history, token]);

  function onRegister (name, email, password) {
    mainApi.signUp(name, email, password)
      .then(() => {
        history.push('/signin');
      })
      .catch((err) => console.log(err));
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
  }

  function onLogout () {
    localStorage.removeItem('token');
    setCurrentUser({});
    setLoggedIn(false);
    history.push('/');
  }

  function historyPushBackward () {
    history.goBack();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path='/'>
            <Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute exact path='/movies'
                          loggedIn={loggedIn}
                          component={Movies}
          />
          <ProtectedRoute exact path='/saved-movies'
                          loggedIn={loggedIn}
                          component={SavedMovies}
          />
          <ProtectedRoute exact path='/profile'
                          loggedIn={loggedIn}
                          component={Profile}
                          currentUser={currentUser}
                          onLogout={onLogout}
          />
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
