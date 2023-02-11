import React from 'react';
import defaultAvatarPath from '../images/kusto.jpg';
import api from '../utils/api.js';
import Card from './Card';


function Main({onEditProfile, onAddPlace, onEditAvatar, handleCardClick, ...props}) {

  const [userName, setUserName] = React.useState('Имя');
  const [userDescription, setUserDescription] = React.useState('Описание');
  const [userAvatar, setUserAvatar] = React.useState(defaultAvatarPath);
  const [cards, setCards] = React.useState([]);

  // initial fetch info from the server
  React.useEffect(() => {
    Promise.all([api.getUserMe(), api.getCards()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardsData);
      })
      .catch(err => reportError(err))
  }, [])

  function renderCards() {
    return cards.map(card => <Card key={card._id} card={card} onCardClick={handleCardClick} />)
  }

  return (
    <main className="content">

      {/* <!-- Profile section --> */}
      <section className="profile" aria-label="Профиль пользователя">
        <figure className="profile__figure">
          <div className="profile__avatar"
               style={{backgroundImage: `url(${userAvatar})`}}
               onClick={onEditAvatar}
               aria-label="Изображение пользователя" />

          <figcaption className="profile__caption">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-btn" type="button"
                    onClick={onEditProfile}
                    aria-label="Кнопка редактирования профиля пользователя" />
            <p className="profile__description">{userDescription}</p>
          </figcaption>
        </figure>

        <button className="profile__add-btn" type="button"
                onClick={onAddPlace} />
      </section>

      {/* <!-- Cards section --> */}
      <section className="elements" aria-label="Места пользователя">
        <ul className="elements__cards">
          {renderCards()}
        </ul>
      </section>

    </main>
  )
}


export default Main
