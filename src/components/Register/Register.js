import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../utils/formValidation';
import './Register.css';

function Register({ onRegister }) {
  const {values, errors, isValid, handleOnChange} = useFormValidation();

  function handleSubmit (e) {
    e.preventDefault();
    onRegister(values.name, values.email, values.password);
  }

  return (
    <section className="auth">
      <div className="auth__header">
        <Link className="link" to='/'><img src={logo} alt="Логотип MovieExplorer" className="auth__logo" /></Link>
        <h2 className="auth__title">
          Добро пожаловать!
        </h2>
      </div>
      <form className="auth__form"
            name="register"
            id="register"
            onSubmit={handleSubmit}
            noValidate={true}
      >
        <label className="auth__label" htmlFor="name">Имя</label>
        <input className="auth__input"
              type="text"
              id="name"
              name="name"
              required
              minLength="2"
              maxLength="30"
              pattern='[а-яА-Яa-zA-ZёË\- ]{1,}'
              value={values.name || ''}
              onChange={handleOnChange}
        />
        <span className="auth__error">{errors.name}</span>
        <label className="auth__label" htmlFor="email">E-mail</label>
        <input className="auth__input"
              type="email"
              id="email"
              name="email"
              required
              minLength="2"
              maxLength="30"
              value={values.email || ''}
              onChange={handleOnChange}
        />
        <span className="auth__error">{errors.email}</span>
        <label className="auth__label" htmlFor="password">Пароль</label>
        <input className="auth__input"
              type="password"
              name="password"
              id="password"
              required
              minLength="2"
              maxLength="30"
              value={values.password || ''}
              onChange={handleOnChange}
        />
        <span className="auth__error">{errors.password}</span>
      </form>
      <div className="auth__footer">
        <button className="button auth__input-submit" form="register" type="submit" disabled={!isValid}>Зарегистрироваться</button>
        <p className="auth__caption">Уже зарегистрированы?&nbsp;<Link className="link auth__link" to='/signin'>Войти</Link></p>
      </div>
    </section>
  )
}

export default Register;