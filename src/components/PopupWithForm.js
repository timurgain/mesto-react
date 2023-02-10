import '../index.css';
import React from 'react';

function PopupWithForm({name, title, saveBtnText, onClose, ...props}) {

  return (
    <div className={`popup popup_type_${name} popup_opened`}
         aria-label={title}
         onMouseDown={onClose}>
        <div className={`popup__container popup__container_type_${name}`}>
          <button className="popup__close-btn" type="button" />
          <h2 className="popup__header">{title}</h2>
          <form className="popup__form" name={name} action="#" noValidate>

            {props.children}

            <button className="popup__save-btn" type="submit">{saveBtnText}</button>
          </form>
        </div>
      </div>
  )
}

export default PopupWithForm
