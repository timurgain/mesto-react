import React from "react";
import PopupWithForm from "./PopupWithForm.js";


function AddPlacePopup({isOpen, onAddPlace, onClose, ...props}) {

  const [link, setLink] = React.useState('');
  const [name, setName] = React.useState('');
  const [saveBtnText, setSaveBtnText] = React.useState('Создать')

  React.useEffect( () => {setSaveBtnText('Создать')}, [isOpen] )

  function handleSubmit(evt) {
    setSaveBtnText('Сохраняю...')
    evt.preventDefault();
    onAddPlace({
      link: link,
      name: name
    });
    setLink('');
    setName('');
  }

  return(
    <PopupWithForm name="place" title="Новое место"
                   saveBtnText={saveBtnText}
                   isOpen={isOpen}
                   onSubmit={handleSubmit}
                   onClose={onClose}>

      <div className="popup__field">
        <input className="popup__input" name="name" placeholder="Название"
               type="text" minLength="2" maxLength="30" required
               value={name}
               onChange={(evt) => setName(evt.target.value)} />
        <span className="popup__error"></span>
      </div>

      <div className="popup__field">
        <input className="popup__input" name="link" placeholder="Ссылка на картинку"
               type="url" required
               value={link}
               onChange={(evt) => setLink(evt.target.value)} />
        <span className="popup__error"></span>
      </div>

    </PopupWithForm>

  )
}


export default AddPlacePopup
