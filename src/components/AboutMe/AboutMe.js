import './AboutMe.css';
import avatar from '../../images/profile-picture.jpg';

function AboutMe () {
  return (
    <section className="student page_side_paddings">
      <h2 className="title">Студент</h2>
      <div className="student__resume">
        <div className="student__text">
          <div className="student__text-wrapper">
            <p className="student__name">Павел</p>
            <p className="student__job">Фронтенд-разработчик, 24 года</p>
            <p className="student__about">
              Влюблен в веб-разработку со школьной скамьи. Обожаю творить и создавать что-то новое. Выбрал веб-разработку по причине практически неограниченных возможностей: где дизайн можно подчеркнуть уникальными фишками интерактивности. Кроме того, люблю наблюдать результат своей работы вживую.
            </p>
          </div>
          <ul className="student__social">
            <li className="student__social-item">
              <a href="https://t.me/pavel_buny" target="blank" className="link student__social-link">Telegram</a>
            </li>
            <li className="student__social-item">
              <a href="https://github.com/paulbuny" target="blank" className="link student__social-link">Github</a>
            </li>
          </ul>
          </div>
          <img className="student__avatar" alt="Фото профиля" src={avatar} />
      </div>
    </section>
  )
};

export default AboutMe;