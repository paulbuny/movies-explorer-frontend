import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState } from "react";

import pic_1 from '../../images/pic__COLOR_pic.jpg';
import pic_2 from '../../images/pic__COLOR_pic_1.jpg';
import pic_3 from '../../images/pic__COLOR_pic_2.jpg';
import pic_4 from '../../images/pic__COLOR_pic_3.jpg';
import pic_5 from '../../images/pic__COLOR_pic_4.jpg';
import pic_6 from '../../images/pic__COLOR_pic_5.jpg';
import pic_7 from '../../images/pic__COLOR_pic_6.jpg';
import pic_8 from '../../images/pic__COLOR_pic_7.jpg';
import pic_9 from '../../images/pic__COLOR_pic_8.jpg';
import pic_10 from '../../images/pic__COLOR_pic_9.jpg';
import pic_11 from '../../images/pic__COLOR_pic_10.jpg';
import pic_12 from '../../images/pic__COLOR_pic_11.jpg';

function Movies (props) {

    // Временное решение для списка фильмов
    const [MoviesList, setMoviesList] = useState([
      {
        id: 1,
        title: '33 слова о дизайне',
        duration: '1ч 47м',
        cover: pic_1,
        liked: true,
      },
      {
        id: 2,
        title: 'Киноальманах «100 лет дизайна»',
        duration: '1ч 3м',
        cover: pic_2,
        liked: false,
      },
      {
        id: 3,
        title: 'В погоне за Бенкси',
        duration: '1ч 42м',
        cover: pic_3,
        liked: false,
      },
      {
        id: 4,
        title: 'Баския: Взрыв реальности',
        duration: '1ч 21м',
        cover: pic_4,
        liked: false,
      },
      {
        id: 5,
        title: 'Бег это свобода',
        duration: '1ч 44м',
        cover: pic_5,
        liked: false,
      },
      {
        id: 6,
        title: 'Книготорговцы',
        duration: '1ч 37м',
        cover: pic_6,
        liked: true,
      },
      {
        id: 7,
        title: 'Когда я думаю о Германии ночью',
        duration: '1ч 56м',
        cover: pic_7,
        liked: false,
      },
      {
        id: 8,
        title: 'Gimme Danger: История Игги и The Stooges',
        duration: '1ч 59м',
        cover: pic_8,
        liked: false,
      },
      {
        id: 9,
        title: 'Дженис: Маленькая девочка грустит',
        duration: '1ч 42м',
        cover: pic_9,
        liked: true,
      },
      {
        id: 10,
        title: 'Соберись перед прыжком',
        duration: '1ч 10м',
        cover: pic_10,
        liked: true,
      },
      {
        id: 11,
        title: 'Пи Джей Харви: A dog called money',
        duration: '1ч 4м',
        cover: pic_11,
        liked: false,
      },
      {
        id: 12,
        title: 'По волнам: Искусство звука в кино',
        duration: '1ч 7м',
        cover: pic_12,
        liked: false,
      },
    ])

  return(
    <>
      <Header history={props.history} loggedIn={props.loggedIn} />
      <main>
        <SearchForm />
        <MoviesCardList saved={false} movieList={MoviesList} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;