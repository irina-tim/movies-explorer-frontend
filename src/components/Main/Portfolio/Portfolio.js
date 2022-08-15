import './Portfolio.css'

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__group">
        <h2 className="portfolio__header">Портфолио</h2>
        <ul className="portfolio__links">
          <li>
            <a
              className="portfolio__link"
              href="https://irina-tim.github.io/how-to-learn/index.html"
            >
              Статичный сайт
              <span className="portfolio__link-arrow"></span>
            </a>
          </li>
          <li>
            <a
              className="portfolio__link"
              href="https://irina-tim.github.io/russian-travel/index.html"
            >
              Адаптивный сайт
              <span className="portfolio__link-arrow"></span>
            </a>
          </li>
          <li>
            <a
              className="portfolio__link"
              href="https://irina-tim.github.io/mesto-react/"
            >
              Одностраничное приложение
              <span className="portfolio__link-arrow"></span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio
