import '../index.css';

function PopupImage() {
  return (
    <div className="popup card-popup" aria-label="Окно просмотра фото">
      <figure className="popup__card">
        <button className="popup__close-btn" type="button"></button>
        <img className="popup__image" src="#" alt="-" />
        <figcaption>
          <p className="popup__caption"></p>
        </figcaption>
      </figure>
    </div>
  )
}


export default PopupImage
