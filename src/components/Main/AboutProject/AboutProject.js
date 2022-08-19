import './AboutProject.css'

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__group">
        <h2 className="about-project__header">О проекте</h2>
        <div className="about-project__info">
          <div className="about-project__column">
            <h3 className="about-project__title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__subtitle">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__column">
            <h3 className="about-project__title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__subtitle">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__time-interval">
          <div className="about-project__time-bar">1 неделя</div>
          <div className="about-project__time-bar">4 недели</div>
        </div>
        <div className="about-project__part">
          <p className="about-project__part-name">Back-end</p>
          <p className="about-project__part-name">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject
