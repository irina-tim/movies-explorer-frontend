import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <div className="techs__group">
        <h2 className="techs__header">Технологии</h2>
        <h2 className="techs__title">7 технологий</h2>
        <h2 className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</h2>
        <ul className="techs__list">
          <li className="techs__list-item">HTML</li>
          <li className="techs__list-item">CSS</li>
          <li className="techs__list-item">JS</li>
          <li className="techs__list-item">React</li>
          <li className="techs__list-item">Git</li>
          <li className="techs__list-item">Express.js</li>
          <li className="techs__list-item">mongoDB</li>
        </ul>
      </div>
        
    </section>
  );
}

export default Techs;