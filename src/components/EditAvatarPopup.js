import React from "react";
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, ...props}) {

  const inputRef = React.useRef();  // the learning task required to use ref here, not state
  const [saveBtnText, setSaveBtnText] = React.useState('Сохранить');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  function handleSubmit(evt) {
    setSaveBtnText('Сохраняю...');
    evt.preventDefault();

    // forwards the data
    onUpdateAvatar({
      avatarUrl: inputRef.current.value
    });

    // back to initial state
    inputRef.current.value = '';
    setSaveBtnText('Сохранить')
    setErrorMsg('');
    setIsValid(false);
  }

  function handleChange(evt) {
    setErrorMsg(evt.target.validationMessage);
    setIsValid(evt.target.validity.valid);
  }


  return (
    <PopupWithForm name="avatar" title="Обновить аватар"
                   saveBtnText={saveBtnText}
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
                   isValid={isValid} >

      <div className="popup__field">
        <input className={`popup__input ${errorMsg ? `popup__input_type_error` : ``}`} name="link" type="url"
               placeholder="Ссылка на изображение" required
               ref={inputRef}
               onChange={handleChange}/>
        <span className={`popup__error ${errorMsg ? `popup__error_visible` : ``}`}>{errorMsg}</span>
      </div>

    </PopupWithForm>
  )

}


export default EditAvatarPopup
