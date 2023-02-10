import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import PopupImage from './PopupImage.js';
import PopupConfirm from './PopupConfirm.js';

import React from 'react';
import '../index.css';

import {popupProfileChildren, popupAvatarChildren, popupPlaceChildren} from './constants.js'


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const statesArr = [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, selectedCard];

  React.useEffect(() => {
    if (statesArr.some(state => !!state === true)) {
      document.addEventListener('keydown', handleEscClose);
    }
    return () => {document.removeEventListener('keydown', handleEscClose)}
  }, statesArr)

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {closeAllPopups()}
  }

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
    console.log(selectedCard)
  }

  function closeAllPopups() {
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setSelectedCard(null);
  };

  return (
    <>
      <Header />

      <Main onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            handleCardClick={handleCardClick} />

      {isEditProfilePopupOpen &&
        <PopupWithForm name="profile" title="Редактировать профиль" saveBtnText="Сохранить" onClose={handleClickClose}>
          {popupProfileChildren}
        </PopupWithForm>}

      {isEditAvatarPopupOpen &&
        <PopupWithForm name="avatar" title="Обновить аватар" saveBtnText="Сохранить" onClose={handleClickClose}>
          {popupAvatarChildren}
        </PopupWithForm>}

      {isAddPlacePopupOpen &&
        <PopupWithForm name="place" title="Новое место" saveBtnText="Создать" onClose={handleClickClose}>
          {popupPlaceChildren}
        </PopupWithForm>}

      {!!selectedCard &&
        <PopupImage card={selectedCard} onClose={handleClickClose}/>}

      {/* popup confirm a card deletion */}
      <PopupConfirm />

      <Footer />
    </>
  );
}

export default App;
