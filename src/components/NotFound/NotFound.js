import './NotFound.css';
import { useHistory } from 'react-router';

function NotFound(props) {
  const history = useHistory();

  function goBack () {
    history.goBack();
  }

  return (
    <section className="err-page">
      <div className="err-page__wrapper">
        <h2 className="err-page__title">404</h2>
        <p className="err-page__message">Страница не найдена</p>
      </div>
      <button className="button err-page__button" onClick={goBack}>Назад</button>
    </section>
  )
}

export default NotFound;