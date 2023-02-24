import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js'
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext, defaultUser } from '../contexts/CurrentUserContext.js';

import React from 'react';

import { popupPlaceChildren } from './constants.js'


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(defaultUser);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserMe(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
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
    const isClosing = ['popup', 'popup__close-btn'].some(cls => Array.from(evt.target.classList).includes(cls))
    if (isClosing) {closeAllPopups()}
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

  function handleLikeClick(card) {
    const isLiked = card.likes.some(like => currentUser._id === like._id);
    if (isLiked) {
      api.deleteLike(card._id).then(updCard => updateCardsList(updCard)).catch(err => reportError(err));
    } else {
      api.putLike(card._id).then(updCard => updateCardsList(updCard)).catch(err => reportError(err));
    }
  }

  function handleCardDelete(card) {
    if (currentUser._id === card.owner._id) {
      api.deleteCard(card._id).then(() => {cutCardsList(card)}).catch(err => reportError(err));
    }
  }

  function updateCardsList(updCard) {
    setCards( cards.map(card => card._id === updCard._id ? updCard : card) )
  }

  function cutCardsList(cutCard) {
    setCards( cards.filter(card => card._id !== cutCard._id) )
  }

  function handleUpdateUser({ name, about }) {
    api.patchUserMe(name, about)
      .then(updUser => setCurrentUser(updUser))
      .catch(err => reportError(err));
    closeAllPopups()
  }

  function handleUpdateAvatar({ avatarUrl }) {
    api.patchUserMeAvatar(avatarUrl)
      .then(updUser => setCurrentUser(updUser))
      .catch(err => reportError(err));
    closeAllPopups()
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
        <Main cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              handleCardClick={handleCardClick}
              handleLikeClick={handleLikeClick}
              handleCardDelete={handleCardDelete} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
                          onUpdateUser={handleUpdateUser}
                          onClose={handleClickClose} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                         onUpdateAvatar={handleUpdateAvatar}
                         onClose={handleClickClose} />

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
