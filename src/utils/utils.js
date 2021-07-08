export function convertToCorrectTiming (duration) {

  return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
}

export function convertImagesUrls (link) {
  return `https://api.nomoreparties.co${link}`;
}

export const checkForSavedMovies = (movies, savedMovies) => {

  movies.forEach((item) => {
    if (savedMovies.some(({ movieId, nameRU }) => movieId === item.id && nameRU === item.nameRU )) {
      item.isSaved = true;
    } else {
      item.isSaved = false;
    }
  })

  return movies;
}

export function filterBySearchQuery (movies, query) {

  const results = movies.filter(movie =>
    movie.nameRU.toLowerCase().includes(query.toLowerCase())
  );

  return results;
}

export function filterByShortFilms (movies, isChecked) {

  const results = movies.filter(movie =>
    isChecked ? movie.duration <= 40 : Number
  );

  return results;
}

export function getErrors (err) {
  if (err.message === "Ошибка: 400")
    return 'Данные введены неправильно';
  if (err.message === "Ошибка: 401")
    return 'Почта или пароль указаны неверно';
  if (err.message === "Ошибка: 403")
    return 'Требуется авторизация';
  if (err.message === "Ошибка: 404")
    return 'Запрашиваемый ресурс не найден';
  if (err.message === "Ошибка: 409")
    return 'Пользователь с таким email уже существует';
  if (err.message === "Ошибка: 429")
    return 'Превышен лимит запросов к серверу. Попробуйте позже';
  return 'Что-то пошло не так. Ошибка сервера';
};