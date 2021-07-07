import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import { useFormValidation } from "../../utils/formValidation";

function Login({ onLogin }) {
  const {values, errors, isValid, handleOnChange} = useFormValidation();

  function handleSubmit (e) {
    e.preventDefault();
    onLogin(values.email, values.password);
  }

  return (
    <section className="auth">
      <div className="auth__header">
        <Link className="link" to='/'><img src={logo} alt="Логотип MovieExplorer" className="auth__logo" /></Link>
        <h2 className="auth__title">
          Рады видеть!
        </h2>
      </div>
      <form className="auth__form"
            id="login"
            name="login"
            onSubmit={handleSubmit}
            noValidate={true}
      >
        <label className="auth__label" htmlFor="email">E-mail</label>
        <input className="auth__input"
              type="email"
              id="email"
              name="email"
              required
              value={values.email || ''}
              minLength="2"
              maxLength="30"
              onChange={handleOnChange}
        />
        <span className="auth__error">{errors.email}</span>
        <label className="auth__label" htmlFor="password">Пароль</label>
        <input className="auth__input"
                type="password"
                id="password"
                name="password"
                required
                minLength="2"
                maxLength="30"
                value={values.password || ''}
                onChange={handleOnChange}
        />
        <span className="auth__error">{errors.password}</span>
      </form>
      <div className="auth__footer">
        <button className="button auth__input-submit" form="login" type="submit" disabled={!isValid}>Войти</button>
        <p className="auth__caption">Ещё не зарегистрированы?&nbsp;<Link className="link auth__link" to='/signup'>Регистрация</Link></p>
      </div>
    </section>
  )
}

export default Login;