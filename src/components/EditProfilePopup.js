import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfilePopup({isOpen, onClose, onUpdateUser, ...props}) {
  const currentUser = React.useContext(CurrentUserContext);

  const inputs = React.useMemo(() => {return ['name', 'about']}, [])  // usual assignment causes warnings due to useEffect with 'inputs'
  const [saveBtnText, setSaveBtnText] = React.useState('Сохранить');

  // tried to make state universal with reduce, but it can be easier - {input1: value1, input2: value2}
  const [values, setValues] = React.useState( inputs.reduce((obj, input) => {return {...obj, [input]: currentUser[input]}}, {}) );
  const [errorMsgs, setErrorMsgs] = React.useState( inputs.reduce((obj, input) => {return {...obj, [input]: ''}}, {}) );
  const [isValid, setIsValid] = React.useState( inputs.reduce((obj, input) => {return {...obj, [input]: true}}, {}) );

  const isFormValid = inputs.every( (input) => isValid[input] === true );

  React.useEffect(() => {
    setValues( inputs.reduce((obj, input) => {return {...obj, [input]: currentUser[input]}}, {}) );
    setErrorMsgs( inputs.reduce((obj, input) => {return {...obj, [input]: ''}}, {}) );
    setIsValid( inputs.reduce((obj, input) => {return {...obj, [input]: true}}, {}) );
  }, [currentUser, isOpen, inputs])

  function handleChange(evt) {
    const key = evt.target.name;
    setValues({...values, [key]: evt.target.value});
    setErrorMsgs({...errorMsgs, [key]: evt.target.validationMessage});
    setIsValid({...isValid, [key]: evt.target.validity.valid});
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setSaveBtnText('Сохраняю...')

    // forwards the data
    onUpdateUser({
      name: values.name,
      about: values.about
    });

    // back to initial state
    setSaveBtnText('Сохранить');
    setValues( inputs.reduce((obj, input) => {return {...obj, [input]: currentUser[input]}}, {}) );
    setErrorMsgs( inputs.reduce((obj, input) => {return {...obj, [input]: ''}}, {}) );
    setIsValid( inputs.reduce((obj, input) => {return {...obj, [input]: true}}, {}) );
  }


  return (
    <PopupWithForm name="profile" title="Редактировать профиль"
                   saveBtnText={saveBtnText}
                   isOpen={isOpen}
                   onSubmit={handleSubmit}
                   onClose={onClose}
                   isValid={isFormValid} >

      <div className="popup__field">
        <input className={`popup__input ${errorMsgs.name ? `popup__input_type_error` : ``}`}
               value={values.name}
               onChange={handleChange}
               name="name" placeholder="Название"
               type="text" minLength="2" maxLength="40" required />
        <span className={`popup__error ${errorMsgs.name ? `popup__error_visible` : ``}`}>{errorMsgs.name}</span>
      </div>

      <div className="popup__field">
        <input className={`popup__input ${errorMsgs.about ? `popup__input_type_error` : ``}`}
               value={values.about}
               onChange={handleChange}
               name="about" placeholder="Название"
               type="text" minLength="2" maxLength="200" required />
        <span className={`popup__error ${errorMsgs.about ? `popup__error_visible` : ``}`}>{errorMsgs.about}</span>
      </div>

    </PopupWithForm>
  )
}


export default EditProfilePopup
