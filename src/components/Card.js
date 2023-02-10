import '../index.css';

function Card({card, onCardClick, ...props}) {

  return (
    <li>
      <figure className="card">
        <img onClick={() => onCardClick(card)} className="card__image" src={card.link} alt={card.name}/>
        <button className="card__trash-btn" type="button" aria-label="Кнопка удалить"></button>
        <figcaption className="card__caption">
          <h2 className="card__header">{card.name}</h2>
          <button className="card__like-btn" type="button" aria-label="Кнопка лайк"></button>
          <span className="card__like-counter">{card.likes.length === 0 ? '' : card.likes.length}</span>
        </figcaption>
      </figure>
    </li>
  )
}


export default Card
