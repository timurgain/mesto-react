import React from "react";
import PopupWithForm from "./PopupWithForm.js";


function AddPlacePopup({isOpen, onAddPlace, onClose, ...props}) {

  const [link, setLink] = React.useState('');
  const [linkErrMsg, setLinkErrMsg] = React.useState('');
  const [isLinkValid, setIsLinkValid] = React.useState(false);

  const [name, setName] = React.useState('');
  const [nameErrMsg, setNameErrMsg] = React.useState('');
  const [isNameValid, setIsNameValid] = React.useState(false);

  const [saveBtnText, setSaveBtnText] = React.useState('Создать')

  const isFormValid = isLinkValid && isNameValid

  React.useEffect(() => {
    setSaveBtnText('Создать');
    setNameErrMsg('')
    setLinkErrMsg('')
  }, [isOpen] )


  function handleSubmit(evt) {
    setSaveBtnText('Сохраняю...')
    evt.preventDefault();
    onAddPlace({
      link: link,
      name: name
    });
    setLink('');
    setName('');
    setIsLinkValid(false);
    setIsNameValid(false);
  }

  function handleNameChange(evt) {
    setName(evt.target.value)
    setNameErrMsg(evt.target.validationMessage)
    setIsNameValid(evt.target.validity.valid)

  }

  function handleLinkChange(evt) {
    setLink(evt.target.value)
    setLinkErrMsg(evt.target.validationMessage)
    setIsLinkValid(evt.target.validity.valid)
  }

  return(
    <PopupWithForm name="place" title="Новое место"
                   saveBtnText={saveBtnText}
                   isOpen={isOpen}
                   onSubmit={handleSubmit}
                   onClose={onClose}
                   isValid={isFormValid}>

      <div className="popup__field">
        <input className={`popup__input ${!!nameErrMsg ? `popup__input_type_error` : ``}`}
               name="name" placeholder="Название"
               type="text" minLength="2" maxLength="30" required
               value={name}
               onChange={handleNameChange} />
        <span className={`popup__error ${!!nameErrMsg ? `popup__error_visible` : ``}`}>
          {nameErrMsg}
        </span>
      </div>

      <div className="popup__field">
        <input className={`popup__input ${!!linkErrMsg ? `popup__input_type_error` : ``}`}
               name="link" placeholder="Ссылка на картинку"
               type="url" required
               value={link}
               onChange={handleLinkChange} />
        <span className={!!linkErrMsg ? `popup__error popup__error_visible` : `popup__error` }>
          {linkErrMsg}
        </span>
      </div>

    </PopupWithForm>

  )
}


export default AddPlacePopup
