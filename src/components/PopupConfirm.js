import '../index.css';

function PopupConfirm() {

  return (
    <>
      <div className="popup confirm-popup" aria-label="Окно подтверждения удаления сущности">
        <div className="popup__container popup__container_type_confirm">
          <button className="popup__close-btn" type="button"></button>
          <h2 className="popup__header popup__header_type_confirm">Вы уверены?</h2>
          <form className="popup__confirm-form" name="confirm" action="#" noValidate>
            <button className="popup__save-btn" type="submit">Да</button>
          </form>
        </div>
      </div>
    </>
  )
}


export default PopupConfirm;
