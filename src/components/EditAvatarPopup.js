import React from "react";
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, ...props}) {

  // the task required to use ref, not state
  const inputRef = React.useRef()
  const [saveBtnText, setSaveBtnText] = React.useState('')

  React.useEffect( () => {setSaveBtnText('Сохранить')}, [isOpen] )

  function handleSubmit(evt) {
    setSaveBtnText('Сохраняю...');
    evt.preventDefault();
    onUpdateAvatar({
      avatarUrl: inputRef.current.value
    });
    inputRef.current.value = '';
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар"
                   saveBtnText={saveBtnText}
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit} >

      <div className="popup__field">
        <input className="popup__input" name="link" type="url"
               placeholder="Ссылка на изображение" required
               ref={inputRef} />
        <span className="popup__error"></span>
      </div>

    </PopupWithForm>
  )

}


export default EditAvatarPopup
