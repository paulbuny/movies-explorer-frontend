import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies ({loggedIn , isPreloaderShown, onShortFilmToggle, onSaveMovie, saved, onSearchSubmit, filteredMovies, searchError, searchQuery}) {

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
            movies={filteredMovies}
            onSaveMovie={onSaveMovie}
            searchError={searchError}
            searchQuery={searchQuery}
          />
        }
      </main>
      <Footer />
    </>
  )
}

export default Movies;