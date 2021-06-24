import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about page_side_paddings">
      <h2 className="title">О проекте</h2>
      <div className="about__two-columns">
        <div className="about__main-text">
          <h3 className="about__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about__main-text">
          <h3 className="about__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__timeline">
        <div className="about__timeline-section">
          <p className="about__timeline-text about__timeline-text_highlighted">1 неделя</p>
          <p className="about__timeline-subtext">Back-end</p>
        </div>
        <div className="about__timeline-section">
          <p className="about__timeline-text">4 недели</p>
          <p className="about__timeline-subtext">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;