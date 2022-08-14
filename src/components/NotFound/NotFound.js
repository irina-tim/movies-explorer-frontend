import './NotFound.css';

function NotFound() {
    return (
        <section className="not-found">
            <div className="not-found__group">
                <h2 className="not-found__title">404</h2>
                <p className="not-found__caption">Страница не найдена</p>
                <button className="not-found__button">Назад</button>
            </div>
        </section>
    );
}

export default NotFound;