import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext, defaultUser } from '../contexts/CurrentUserContext.js';

import React from 'react';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
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

  const isPopupOpen = (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen
                        || isConfirmPopupOpen || isImagePopupOpen);

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
    setIsImagePopupOpen(true);
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
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  }

  function handleConfirmCardDelete() {
    if (currentUser._id === selectedCard.owner._id) {
      api.deleteCard(selectedCard._id).then(() => {cutCardsList(selectedCard)}).catch(err => reportError(err));
    };
    closeAllPopups();
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

  function handleAddPlaceSubmit({link, name}) {
    api.postCard(link, name)
      .then(newCard => setCards([newCard, ...cards]))
      .catch(err => reportError(err));
    closeAllPopups()
  }

  function closeAllPopups() {
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsImagePopupOpen(false);
      setIsConfirmPopupOpen(false);
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

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                       onAddPlace={handleAddPlaceSubmit}
                       onClose={handleClickClose} />

        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={handleClickClose} />

        {/* popup confirm a card deletion */}
        <PopupWithForm name="confirm" title="Вы уверены?" saveBtnText="Да"
                       isOpen={isConfirmPopupOpen}
                       onSubmit={handleConfirmCardDelete}
                       onClose={handleClickClose}  />

        <Footer />

      </CurrentUserContext.Provider>
  );
}

export default App;
