import './Promo.css';

function Promo({ handlerOnClick }) {
  return (
    <section className="promo page_side_paddings">
      <div className="promo__text-wrapper">
        <div className="promo__image"></div>
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      </div>
      <button className="button promo__button" onClick={handlerOnClick}>Узнать больше</button>
    </section>
  )
}

export default Promo;