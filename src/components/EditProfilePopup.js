import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfilePopup({isOpen, onClose, onUpdateUser, ...props}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    })
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" saveBtnText="Сохранить"
                   isOpen={isOpen}
                   onSubmit={handleSubmit}
                   onClose={onClose} >

      <div className="popup__field">
        <input className="popup__input" name="name" type="text"
               minLength="2" maxLength="40" required
               value={name}
               onChange={(evt) => {setName(evt.target.value)}} />
        <span className="popup__error"></span>
      </div>

      <div className="popup__field">
        <input className="popup__input" name="description" type="text"
               minLength="2" maxLength="200" required
               value={description}
               onChange={(evt) => {setDescription(evt.target.value)}} />
        <span className="popup__error"></span>
      </div>

    </PopupWithForm>
  )
}


export default EditProfilePopup
