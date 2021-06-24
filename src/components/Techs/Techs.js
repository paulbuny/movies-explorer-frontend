import './Techs.css';

function Techs() {
  return (
    <section className="tech page_side_paddings">
      <h2 className="title">Технологии</h2>
      <h3 className="tech__subtitle">7 технологий</h3>
      <p className="tech__main-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="tech__list">
        <li className="tech__item">
          <p className="tech__item-title">HTML</p>
        </li>
        <li className="tech__item">
          <p className="tech__item-title">CSS</p>
        </li>
        <li className="tech__item">
          <p className="tech__item-title">JS</p>
        </li>
        <li className="tech__item">
          <p className="tech__item-title">React</p>
        </li>
        <li className="tech__item">
          <p className="tech__item-title">Git</p>
        </li>
        <li className="tech__item">
          <p className="tech__item-title">Express.js</p>
        </li>
        <li className="tech__item">
          <p className="tech__item-title">mongoDB</p>
        </li>
      </ul>
    </section>
  )
}

export default Techs;