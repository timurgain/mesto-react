import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';

import '../index.css';

function App() {
  return (
    <>

      <Header />
      <Main />

      {/* <!-- Pop-up window, edit a profile name and description --> */}
      <div className="popup profile-popup" aria-label="Окно редактирования профиля">
        <div className="popup__container">
          <button className="popup__close-btn" type="button"></button>
          <h2 className="popup__header">Редактировать профиль</h2>

          <form className="popup__form" name="profile" action="#" noValidate>

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

            <button className="popup__save-btn" type="submit">Сохранить</button>
          </form>
        </div>
      </div>

      {/* <!-- Pop-up window, edit a profile avatar --> */}
      <div className="popup avatar-popup" aria-label="Окно редактирования аватара">
        <div className="popup__container popup__container_type_avatar">
          <button className="popup__close-btn" type="button"></button>
          <h2 className="popup__header popup__header_type_avatar">Обновить аватар</h2>

          <form className="popup__form" name="avatar" action="#" noValidate>

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

          <form className="popup__form" name="place" action="#" noValidate>

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
          <form className="popup__confirm-form" name="confirm" action="#" noValidate>
            <button className="popup__save-btn" type="submit">Да</button>
          </form>
        </div>
      </div>

      <Footer />

    </>
  );
}

export default App;
