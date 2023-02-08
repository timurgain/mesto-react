import logoPath from '../images/logo-mesto.svg';
import '../index.css';


function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип Место Россия"/>
    </header>
  )
}

export default Header;
