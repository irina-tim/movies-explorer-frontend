import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__caption">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__group">
        <p className="footer__copyright">© {new Date().getFullYear()}</p>
        <nav>
          <ul className="footer__links">
            <li>
              <a
                className="footer__link"
                href="https://practicum.yandex.ru"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                href="https://github.com/irina-tim/"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                href="https://www.instagram.com/irene.timoshenko/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
