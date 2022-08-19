import './Promo.css'
import promoLogo from '../../../images/promo-logo.svg'

function Promo() {
  return (
    <section className="promo">
      <div className="promo__group">
        <div className="promo__info">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-&zwj;разработки.
          </h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a className="promo__learn-more-link" href="#about-project">
            Узнать больше
          </a>
        </div>
        <img
          className="promo__logo"
          alt="Планета Земля, нарисованная из множества надписей web"
          src={promoLogo}
        />
      </div>
    </section>
  )
}

export default Promo
