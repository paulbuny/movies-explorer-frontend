import './AboutMe.css';
import avatar from '../../images/profile_picture.png';

function AboutMe () {
  return (
    <section className="student page_side_paddings">
      <h2 className="title">Студент</h2>
      <div className="student__resume">
        <div className="student__text">
          <div className="student__text-wrapper">
            <p className="student__name">Виталий</p>
            <p className="student__job">Фронтенд-разработчик, 30 лет</p>
            <p className="student__about">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
          </div>
          <ul className="student__social">
            <li className="student__social-item">
              <a href="https://www.facebook.com/Unkn0wnPl2yer" target="blank" className="link student__social-link">Facebook</a>
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