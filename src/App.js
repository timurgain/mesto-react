import logo from './images/logo-mesto.svg';
import './index.css';

function App() {
  return (

    <body className="page">

      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Место Россия"/>
      </header>

      <main className="content">

        {/* <!-- Profile section --> */}
        <section className="profile" aria-label="Профиль пользователя">

          <figure className="profile__figure">

            <div className="profile__avatar" aria-label="Изображение пользователя"></div>
            <figcaption className="profile__caption">

              <h1 className="profile__name">Имя</h1>
              <button className="profile__edit-btn" type="button" aria-label="Кнопка редактирования профиля пользователя"></button>
              <p className="profile__description">Описание</p>
            </figcaption>
          </figure>

          <button className="profile__add-btn" type="button"></button>
        </section>

        {/* <!-- Elements section --> */}
        <section className="elements" aria-label="Места пользователя">

          <ul className="elements__cards">

            <template id="card">
              <li><figure className="card">
                <img className="card__image" src="#" alt="-"/>
                <button className="card__trash-btn" type="button" aria-label="Кнопка удалить"></button>
                <figcaption className="card__caption">
                  <h2 className="card__header"></h2>
                  <button className="card__like-btn" type="button" aria-label="Кнопка лайк"></button>
                  <span className="card__like-counter">0</span>
                </figcaption>
              </figure></li>
            </template>

          </ul>
        </section>
      </main>

      {/* <!-- Pop-up window, edit a profile name and description --> */}
      <div className="popup profile-popup" aria-label="Окно редактирования профиля">
        <div className="popup__container">
          <button className="popup__close-btn" type="button"></button>
          <h2 className="popup__header">Редактировать профиль</h2>

          <form className="popup__form" name="profile" action="#" novalidate>

            <div className="popup__field">
              <input className="popup__input" name="name" type="text"
                required minlength="2" maxlength="40" />
              <span className="popup__error"></span>
            </div>

            <div className="popup__field">
              <input className="popup__input" name="description" type="text"
                required minlength="2" maxlength="200" />
              <span className="popup__error"></span>
            </div>

            <button className="popup__save-btn" type="submit">Сохранить</button>
          </form>
        </div>
      </div>

      {/* <!-- Pop-up window, edit a profile avatar --> */}
      <div className="popup avatar-popup" aria-label="Окно редактирования аватара">
        <div className="popup__container popup__container_type_avatar">
          <button className="popup__close-btn" type="button"></button>
          <h2 className="popup__header popup__header_type_avatar">Обновить аватар</h2>

          <form className="popup__form" name="avatar" action="#" novalidate>

            <div className="popup__field">
              <input className="popup__input" name="link" type="url" placeholder="Ссылка на изображение" />
                required>
              <span className="popup__error"></span>
            </div>

            <button className="popup__save-btn" type="submit">Сохранить</button>
          </form>
        </div>
      </div>

      {/* <!-- Pop-up window, add a new place--> */}
      <div className="popup place-popup" aria-label="Окно добавления нового места">
        <div className="popup__container">
          <button className="popup__close-btn" type="button"></button>
          <h2 className="popup__header">Новое место</h2>

          <form className="popup__form" name="place" action="#" novalidate>

            <div className="popup__field">
              <input className="popup__input" name="name" type="text" placeholder="Название"
                required minlength="2" maxlength="30" />
              <span className="popup__error"></span>
            </div>

            <div className="popup__field">
              <input className="popup__input" name="link" type="url" placeholder="Ссылка на картинку"
                required />
              <span className="popup__error"></span>
            </div>

            <button className="popup__save-btn" type="submit">Создать</button>
          </form>
        </div>
      </div>

      {/* <!-- Pop-up window, view a card detail --> */}
      <div className="popup card-popup" aria-label="Окно просмотра фото">
        <figure className="popup__card">
          <button className="popup__close-btn" type="button"></button>
          <img className="popup__image" src="#" alt="-" />
          <figcaption>
            <p className="popup__caption"></p>
          </figcaption>
        </figure>
      </div>

      {/* <!-- Pop-up window, confirm a card deletion --> */}
      <div className="popup confirm-popup" aria-label="Окно подтверждения удаления сущности">
        <div className="popup__container popup__container_type_confirm">
          <button className="popup__close-btn" type="button"></button>
          <h2 className="popup__header popup__header_type_confirm">Вы уверены?</h2>
          <form className="popup__confirm-form" name="confirm" action="#" novalidate>
            <button className="popup__save-btn" type="submit">Да</button>
          </form>
        </div>
      </div>

      <footer className="footer">
        <p className="footer__paragraph">© 2022 Mesto Russia</p>
      </footer>

    </body>

  );
}

export default App;
