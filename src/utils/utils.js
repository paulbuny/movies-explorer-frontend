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