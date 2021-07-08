class MainApi {
  constructor({ baseUrl}) {
    this._baseUrl = baseUrl;
  }

  // Проверка ответа от сервера
  _getResponseStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
  }

  // Получить все фильмы
  getMovies(token) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type':'application/json',
      }
    })
    .then((res) => this._getResponseStatus(res));
  }

  // Добавление фильма
  addMovie({id, country, description, director, duration, image, thumbnail, nameEN, nameRU, trailer, year, token}) {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        movieId: id.toString(),
        country,
        description,
        director,
        duration,
        image: image,
        thumbnail: thumbnail,
        nameEN,
        nameRU,
        trailer,
        year,
      })
    })
    .then(res => this._getResponseStatus(res))
  }

  // Удаление фильма по id
  deleteMovie(movieId, token) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => this._getResponseStatus(res))
  }

  // Получение данных о пользователе
  getCurrentUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => this._getResponseStatus(res))
  }

  updateUserProfile(name, email, token){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
      })
    })
    .then((res) => this._getResponseStatus(res))
  }

  // Войти в учетную запись
  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then((res) => this._getResponseStatus(res));
  }

  // Зарегистрировать учетную запись
  signUp(name, email, password){
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      })
    })
    .then((res) => this._getResponseStatus(res));
  }
}

const mainApi = new MainApi({
  // baseUrl: 'https://api.peacewalker.nomoredomains.icu',
  baseUrl: 'http://localhost:3005',
})

export default mainApi;