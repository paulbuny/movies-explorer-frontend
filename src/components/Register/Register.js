import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Register.css';

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleOnNameChange (e) {
    setName(e.target.value);
    console.log(name);
  }

  function handleOnEmailChange (e) {
    setEmail(e.target.value);
  }

  function handleOnPasswordChange (e) {
    setPassword(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    props.onRegister(name, email, password);
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <section className="auth">
      <div className="auth__header">
        <Link className="link" to='/'><img src={logo} alt="Логотип MovieExplorer" className="auth__logo" /></Link>
        <h2 className="auth__title">
          Добро пожаловать!
        </h2>
      </div>
      <form className="auth__form" name="register__form" id="register__form" onSubmit={handleSubmit}>
        <label className="auth__label" htmlFor="auth__name">Имя</label>
        <input className="auth__input" type="text" id="auth__name" name="auth__name" onChange={handleOnNameChange}/>
        <span className="auth__error"></span>
        <label className="auth__label" htmlFor="auth__email">E-mail</label>
        <input className="auth__input" type="email"  id="auth__email" name="auth__email" onChange={handleOnEmailChange}/>
        <span className="auth__error"></span>
        <label className="auth__label" htmlFor="auth__password">Пароль</label>
        <input className="auth__input auth__input_error" type="password" id="auth__password" name="auth__password" onChange={handleOnPasswordChange}/>
        <span className="auth__error">Что-то пошло не так...</span>
      </form>
      <div className="auth__footer">
        <button className="button auth__input-submit" form="register__form" type="submit">Зарегистрироваться</button>
        <p className="auth__caption">Уже зарегистрированы?&nbsp;<Link className="link auth__link" to='/signin'>Войти</Link></p>
      </div>
    </section>
  )
}

export default Register;