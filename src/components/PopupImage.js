import '../index.css';

function PopupImage({card, onClose, ...props}) {
  return (
    <div className='popup card-popup popup_opened'
         aria-label="Окно просмотра фото"
         onMouseDown={onClose}>
      <figure className="popup__card">
        <button className="popup__close-btn" type="button"></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption>
          <p className="popup__caption">{card.name}</p>
        </figcaption>
      </figure>
    </div>
  )
}


export default PopupImage
