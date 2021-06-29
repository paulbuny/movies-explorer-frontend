import { Link } from "react-router-dom";
import { useState } from "react";
import logo from '../../images/logo.svg';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleOnEmailChange (e) {
    setEmail(e.target.value);
  }

  function handleOnPasswordChange (e) {
    setPassword(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    props.onLogin(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <section className="auth">
      <div className="auth__header">
        <Link className="link" to='/'><img src={logo} alt="Логотип MovieExplorer" className="auth__logo" /></Link>
        <h2 className="auth__title">
          Рады видеть!
        </h2>
      </div>
      <form className="auth__form" name="register__form" id="register__form" onSubmit={handleSubmit}>
        <label className="auth__label" htmlFor="auth__email">E-mail</label>
        <input className="auth__input" type="email"  id="auth__email" name="auth__email" onChange={handleOnEmailChange} />
        <span className="auth__error"></span>
        <label className="auth__label" htmlFor="auth__password">Пароль</label>
        <input className="auth__input auth__input_error" type="password" id="auth__password" name="auth__password" onChange={handleOnPasswordChange} />
        <span className="auth__error"></span>
      </form>
      <div className="auth__footer">
        <button className="button auth__input-submit" form="register__form" type="submit">Войти</button>
        <p className="auth__caption">Ещё не зарегистрированы?&nbsp;<Link className="link auth__link" to='/signup'>Регистрация</Link></p>
      </div>
    </section>
  )
}

export default Login;