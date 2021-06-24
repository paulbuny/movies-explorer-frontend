import './App.css';
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from 'react-router';
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
    name: 'Виталий',
    email: 'pochta@yandex.ru',
    password: '123456',
  });

  function historyPushBackward () {
    history.goBack();
  }


  return (
    <div className="page">
      <Switch>
        <Route exact path='/'>
          <Main loggedIn={false} history={history}/>
        </Route>
        <Route exact path='/movies'>
          <Movies loggedIn={true} history={history}/>
        </Route>
        <Route exact path='/saved-movies'>
          <SavedMovies loggedIn={true} history={history}/>
        </Route>
        <Route exact path='/profile'>
          <Profile currentUser={currentUser} loggedIn={true} history={history}/>
        </Route>
        <Route exact path='/signup'>
          <Register />
        </Route>
        <Route exact path='/signin'>
          <Login />
        </Route>
        <Route exact path='*'>
          <NotFound onClick={historyPushBackward} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
