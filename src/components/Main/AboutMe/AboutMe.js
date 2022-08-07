import './AboutMe.css';
import studentPhoto from '../../../images/about-me-photo.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__group">
        <h2 className="about-me__header">Студент</h2>
        <div className="about-me__columns">
          <div className="about-me__column">
            <h3 className="about-me__title">Ирина</h3>
            <p className="about-me__subtitle">Фронтенд-разработчик, 31 год</p>
            <p className="about-me__caption">Живу в Санкт-Петербурге. Замужем, есть двое детей. 
                Я люблю фотографировать детей и природу, делать разные вещи своими руками. 
                Работала в сфере IT, но в качестве релиз-инженера. Теперь я чебурашка.</p>
            <ul className="about-me__links">
              <li>
                 <a className="about-me__link" href="https://www.instagram.com/irene.timoshenko/">Instagram</a>
              </li>
              <li>
                <a className="about-me__link" href="https://github.com/irina-tim/">Github</a>
              </li>
            </ul>
          </div>
          <div className="about-me__column">
            <img className="about-me__photo" alt='Фотография студента' src={studentPhoto}/>
          </div>
        </div> 
      </div>       
    </section>
  );
}

export default AboutMe;