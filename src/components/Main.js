import '../index.css'


function Main({onEditProfile, onAddPlace, onEditAvatar, ...props}) {

  return (
    <main className="content">

      {/* <!-- Profile section --> */}
      <section className="profile" aria-label="Профиль пользователя">

        <figure className="profile__figure">

          <div className="profile__avatar"
               onClick={onEditAvatar}
               aria-label="Изображение пользователя"></div>
          <figcaption className="profile__caption">

            <h1 className="profile__name">Имя</h1>
            <button className="profile__edit-btn"
                    onClick={onEditProfile}
                    type="button"
                    aria-label="Кнопка редактирования профиля пользователя"></button>
            <p className="profile__description">Описание</p>
          </figcaption>
        </figure>

        <button className="profile__add-btn"
                type="button"
                onClick={onAddPlace}></button>
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
  )
}


export default Main
