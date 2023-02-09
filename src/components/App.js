import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import PopupImage from './PopupImage.js';
import PopupConfirm from './PopupConfirm.js';

import React from 'react';
import '../index.css';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const statesArr = [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen];

  React.useEffect(() => {
    if (statesArr.some(state => state === true)) {
      document.addEventListener('keydown', handleEscClose);
    }
    return () => {document.removeEventListener('keydown', handleEscClose)}
  }, statesArr)

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {closeAllPopups()}
  }

  function handleClickClose(evt) {
    if (['popup', 'popup__close-btn'].some(
      cls => Array.from(evt.target.classList).includes(cls)
      )) {closeAllPopups()}
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function closeAllPopups() {
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
  };

  return (
    <>
      <Header />
      <Main onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick} />

      {/* profile */}
      <PopupWithForm name="profile" title="Редактировать профиль"
                     saveBtnText="Сохранить"
                     isOpen={isEditProfilePopupOpen}
                     onClose={handleClickClose}>
        {/* props.children */}
        <div className="popup__field">
          <input className="popup__input" name="name" type="text"
            required minLength="2" maxLength="40" />
          <span className="popup__error"></span>
        </div>
        <div className="popup__field">
          <input className="popup__input" name="description" type="text"
            required minLength="2" maxLength="200" />
          <span className="popup__error"></span>
        </div>
      </PopupWithForm>

      {/* avatar */}
      <PopupWithForm name="avatar" title="Обновить аватар"
                     saveBtnText="Сохранить"
                     isOpen={isEditAvatarPopupOpen}
                     onClose={handleClickClose}>
        <div className="popup__field">
          <input className="popup__input" name="link" type="url" placeholder="Ссылка на изображение" required />
          <span className="popup__error"></span>
        </div>
      </PopupWithForm>

      {/* place */}
      <PopupWithForm name="place" title="Новое место"
                     saveBtnText="Создать"
                     isOpen={isAddPlacePopupOpen}
                     onClose={handleClickClose}>
        <div className="popup__field">
          <input className="popup__input" name="name" type="text" placeholder="Название"
            required minLength="2" maxLength="30" />
          <span className="popup__error"></span>
        </div>
        <div className="popup__field">
          <input className="popup__input" name="link" type="url" placeholder="Ссылка на картинку"
            required />
          <span className="popup__error"></span>
        </div>
      </PopupWithForm>

      {/* view a card detail */}
      <PopupImage />

      {/* confirm a card deletion */}
      <PopupConfirm />

      <Footer />
    </>
  );
}

export default App;
