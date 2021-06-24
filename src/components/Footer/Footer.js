import './Footer.css';

function Footer () {
  return (
    <footer className="footer page_side_paddings">
      <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      <div className="footer__links">
        <p className="footer__copyright">Pavel Bunyakin &copy; 2020</p>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <a href="https://praktikum.yandex.ru" target="blank" className="link footer__nav-link">Яндекс.Практикум</a>
            </li>
          <li className="footer__nav-item">
            <a href="https://github.com/paulbuny" target="blank" className="link footer__nav-link">Github</a>
            </li>
          <li className="footer__nav-item">
            <a href="https://www.facebook.com/Unkn0wnPl2yer" target="blank" className="link footer__nav-link">Facebook</a>
            </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer