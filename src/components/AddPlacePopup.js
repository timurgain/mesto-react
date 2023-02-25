import React from "react";
import PopupWithForm from "./PopupWithForm.js";


function AddPlacePopup({isOpen, onAddPlace, onClose, ...props}) {

  const inputs = ['name', 'link']
  const [saveBtnText, setSaveBtnText] = React.useState('Создать');

  const [values, setValues] = React.useState( inputs.reduce((obj, input) => {obj[input] = ''; return obj}, {}) );
  const [errorMsgs, setErrorMsgs] = React.useState( inputs.reduce((obj, input) => {obj[input] = ''; return obj}, {}) );
  const [isValid, setIsValid] = React.useState( inputs.reduce((obj, input) => {obj[input] = false; return obj}, {}) );

  const isFormValid = inputs.every( (input) => isValid[input] === true );

  function handleChange(evt) {
    const key = evt.target.name;
    setValues({...values, [key]: evt.target.value});
    setErrorMsgs({...errorMsgs, [key]: evt.target.validationMessage});
    setIsValid({...isValid, [key]: evt.target.validity.valid});
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setSaveBtnText('Сохраняю...')

    // forwarded the data
    onAddPlace({
      link: values.link,
      name: values.name
    });

    // returned to initial state
    setSaveBtnText('Создать');
    setValues( inputs.reduce((obj, input) => {obj[input] = ''; return obj}, {}) );
    setIsValid( inputs.reduce((obj, input) => {obj[input] = false; return obj}, {}) );
    setErrorMsgs( inputs.reduce((obj, input) => {obj[input] = ''; return obj}, {}) )
  }

  return(
    <PopupWithForm name="place" title="Новое место"
                   saveBtnText={saveBtnText}
                   isOpen={isOpen}
                   onSubmit={handleSubmit}
                   onClose={onClose}
                   isValid={isFormValid}>

      <div className="popup__field">
        <input className={`popup__input ${errorMsgs.name ? `popup__input_type_error` : ``}`}
               value={values.name}
               onChange={handleChange}
               name="name" placeholder="Название"
               type="text" minLength="2" maxLength="30" required />
        <span className={`popup__error ${errorMsgs.name ? `popup__error_visible` : ``}`}>{errorMsgs.name}</span>
      </div>

      <div className="popup__field">
        <input className={`popup__input ${errorMsgs.link ? `popup__input_type_error` : ``}`}
               value={values.link}
               onChange={handleChange}
               name="link" placeholder="Ссылка на картинку"
               type="url" required />
        <span className={`popup__error ${errorMsgs.link ? `popup__error_visible` : ``}`}>{errorMsgs.link}</span>
      </div>

    </PopupWithForm>

  )
}


export default AddPlacePopup
