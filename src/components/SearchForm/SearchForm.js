import { useState } from 'react';
import ('./SearchForm.css');

function SearchForm ({ onSearchSubmit, onShortFilmToggle }) {
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] =  useState('');
  const [isChecked, setIsChecked] = useState(false);

  function handleChange (e) {
    setSearchQuery(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    if (searchQuery.length === 0) {
      setError('Введите ключевое слово');
    } else {
      setError('');
      onSearchSubmit(searchQuery);
    }
  }

  function handleOnShortFilmsToggle () {
    setIsChecked(prev => !prev);
    onShortFilmToggle(!isChecked);
  }

  return (
    <section className="search page_side_paddings">
      <form className="search-bar"
            onSubmit={handleSubmit}
            noValidate={true}
            >
        <fieldset className="search-bar__wrapper">
          <input className="search-bar__search"
                  type="search"
                  name="search-bar__search"
                  id="search-bar__search"
                  placeholder="Фильм"
                  required
                  value={searchQuery}
                  onChange={handleChange}
          />
          <input className="button search-bar__submit" type="submit" value="" />
        </fieldset>
        <div className="search-bar__sidepanel">
          <input className="search-bar__switch"
                  type="checkbox" name="shortfilm"
                  id="shortfilm"
                  checked={isChecked}
                  onChange={handleOnShortFilmsToggle}
          />
          <label className="search-bar__label" htmlFor="shortfilm">Короткометражки</label>
        </div>
      </form>
      <span className="search__error">{error}</span>
    </section>
  )
}

export default SearchForm;