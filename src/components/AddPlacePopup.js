import React from "react";
import PopupWithForm from "./PopupWithForm.js";


function AddPlacePopup({isOpen, onAddPlace, onClose, ...props}) {

  const [link, setLink] = React.useState('');
  const [name, setName] = React.useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      link: link,
      name: name
    })
  }

  return(
    <PopupWithForm name="place" title="Новое место" saveBtnText="Создать"
                   isOpen={isOpen}
                   onSubmit={handleSubmit}
                   onClose={onClose}>

      <div className="popup__field">
        <input className="popup__input" name="name" placeholder="Название"
               type="text" minLength="2" maxLength="30" required
               onChange={(evt) => setName(evt.target.value)} />
        <span className="popup__error"></span>
      </div>
      <div className="popup__field">
        <input className="popup__input" name="link" placeholder="Ссылка на картинку"
               type="url" required
               onChange={(evt) => setLink(evt.target.value)} />
        <span className="popup__error"></span>
      </div>

    </PopupWithForm>

  )
}


export default AddPlacePopup
