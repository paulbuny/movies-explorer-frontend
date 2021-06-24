import './SavedMovies.css';
import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

// Временное решение для карточек
import pic_1 from '../../images/pic__COLOR_pic.jpg';
import pic_6 from '../../images/pic__COLOR_pic_5.jpg';
import pic_9 from '../../images/pic__COLOR_pic_8.jpg';

function SavedMovies (props) {

      // Временное решение для сохраненных фильмов
      const [SavedMovies, setSavedMovies] = useState([
        {
          id: 1,
          title: '33 слова о дизайне',
          duration: '1ч 47м',
          cover: pic_1,
          liked: true,
        },
        {
          id: 6,
          title: 'Киноальманах «100 лет дизайна»',
          duration: '1ч 47м',
          cover: pic_6,
          liked: true,
        },
        {
          id: 9,
          title: 'В погоне за Бенкси',
          duration: '1ч 47м',
          cover: pic_9,
          liked: true,
        }
      ])

  return(
    <>
    <Header history={props.history} loggedIn={true} />
    <main>
      <SearchForm />
      <MoviesCardList saved={true} movieList={SavedMovies}/>
    </main>
    <Footer />
    </>
  )
}

export default SavedMovies;