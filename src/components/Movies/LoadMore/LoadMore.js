import './LoadMore.css'

function LoadMore({ loadMore }) {
  return (
    <section className="load-more">
      <button className="load-more__button" type="button" onClick={loadMore}>
        Ещё
      </button>
    </section>
  )
}

export default LoadMore
