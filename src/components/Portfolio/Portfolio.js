import './Portfolio.css';

function Portfolio () {
  return (
  <section className="portfolio page_side_paddings">
    <h2 className="portfolio__title">Портфолио</h2>
    <ul className="portfolio__list">
      <li className="portfolio__item">
        <a href="https://github.com/paulbuny/how-to-learn" target="blank" className="link portfolio__link">Статичный сайт</a>
      </li>
      <li className="portfolio__item">
        <a href="https://github.com/paulbuny/russian-travel" target="blank" className="link portfolio__link">Адаптивный сайт</a>
      </li>
      <li className="portfolio__item">
        <a href="https://github.com/paulbuny/react-mesto-api-full" target="blank" className="link portfolio__link">Одностраничное приложение</a>
      </li>
    </ul>
    </section>
  );
}

export default Portfolio;