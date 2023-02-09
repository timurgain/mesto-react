import '../index.css';

function Card({id, link, name, likesNumber, ...props}) {
  return (

    <li key={id}>
      <figure className="card">
        <img className="card__image" src={link} alt={name}/>
        <button className="card__trash-btn" type="button" aria-label="Кнопка удалить"></button>
        <figcaption className="card__caption">
          <h2 className="card__header">{name}</h2>
          <button className="card__like-btn" type="button" aria-label="Кнопка лайк"></button>
          <span className="card__like-counter">{likesNumber == 0 ? '' : likesNumber}</span>
        </figcaption>
      </figure>
    </li>

  )
}


export default Card
