import React from "react";


function InputText({name, placeholder, isOpen, onChange, ...props}) {
  const [value, setValue] = React.useState('');
  const [validationMessage, setValidationMessage] = React.useState('')
  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {setValidationMessage('')}, [isOpen])

  function handleChange(evt) {
    onChange(evt, value)
  }

  return(
    <div className="popup__field">
      <input className={`popup__input ${isValid ? `` : `popup__input_type_error`}`} type="text" minLength="2" maxLength="30" required noValidate

             name={name}
             placeholder={placeholder}
             value={value}
             onChange={handleChange} />

      <span className={`popup__error ${isValid ? `` : `popup__error_visible`}`}>
        {validationMessage}
      </span>
  </div>
  )

}


export default InputText
