// const popupProfileChildren = (
//   <>
//     <div className="popup__field">
//       <input className="popup__input" name="name" type="text"
//         required minLength="2" maxLength="40" />
//       <span className="popup__error"></span>
//     </div>
//     <div className="popup__field">
//       <input className="popup__input" name="description" type="text"
//         required minLength="2" maxLength="200" />
//       <span className="popup__error"></span>
//     </div>
//   </>
// );
const popupAvatarChildren = (
    <div className="popup__field">
      <input className="popup__input" name="link" type="url" placeholder="Ссылка на изображение" required />
      <span className="popup__error"></span>
    </div>
);
const popupPlaceChildren = (
  <>
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
  </>
)


export { popupAvatarChildren, popupPlaceChildren}
