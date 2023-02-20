import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card({card, onCardClick, ...props}) {

  const currentUser = React.useContext(CurrentUserContext);

  function isOwner() {
    return currentUser._id === card.owner._id
  }

  function isLiked() {
    return card.likes.some((like) => {
      return currentUser._id === like._id
    })
  }

  return (
    <li>
      <figure className="card">
        <img onClick={() => onCardClick(card)} className="card__image" src={card.link} alt={card.name}/>
        <button className={`card__trash-btn ${ isOwner() && `card__trash-btn_visible` }`} type="button" aria-label="Кнопка удалить"></button>
        <figcaption className="card__caption">
          <h2 className="card__header">{card.name}</h2>
          <button className={`card__like-btn ${ isLiked() && 'card__like-btn_active' }`} type="button" aria-label="Кнопка лайк"></button>
          <span className="card__like-counter">{card.likes.length === 0 ? '' : card.likes.length}</span>

        </figcaption>
      </figure>
    </li>
  )
}


export default Card
