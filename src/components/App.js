import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext, defaultUser } from '../contexts/CurrentUserContext.js';

import React from 'react';

import {popupProfileChildren, popupAvatarChildren, popupPlaceChildren} from './constants.js'


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(defaultUser);

  React.useEffect(() => {
    api.getUserMe()
      .then((userData) => {setCurrentUser(userData)})
      .catch(err => reportError(err))
  }, [])

  const isPopupOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || !!selectedCard;

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {closeAllPopups()}
    }

    if (isPopupOpen) {
      document.addEventListener('keydown', handleEscClose);
    }
    return () => {document.removeEventListener('keydown', handleEscClose)}
  }, [isPopupOpen])

  function handleClickClose(evt) {
    if (['popup', 'popup__close-btn'].some(cls => Array.from(evt.target.classList).includes(cls))) {
        closeAllPopups()
      }
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

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setSelectedCard(null);
  };

  return (
      <CurrentUserContext.Provider value={currentUser}>

        <Header />
        <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              handleCardClick={handleCardClick} />


        <PopupWithForm name="profile" title="Редактировать профиль" saveBtnText="Сохранить"
                      onClose={handleClickClose} isOpen={isEditProfilePopupOpen}>
          {popupProfileChildren}
        </PopupWithForm>

        <PopupWithForm name="avatar" title="Обновить аватар" saveBtnText="Сохранить"
                      onClose={handleClickClose} isOpen={isEditAvatarPopupOpen}>
          {popupAvatarChildren}
        </PopupWithForm>

        <PopupWithForm name="place" title="Новое место" saveBtnText="Создать"
                      onClose={handleClickClose} isOpen={isAddPlacePopupOpen}>
          {popupPlaceChildren}
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={handleClickClose} />

        {/* popup confirm a card deletion, doesnt work for now */}
        <PopupWithForm name="confirm" title="Вы уверены?" saveBtnText="Да"
                      onClose={handleClickClose} isOpen={false} />

        <Footer />

      </CurrentUserContext.Provider>
  );
}

export default App;
