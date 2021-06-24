import ('./SearchForm.css');

function SearchForm () {
  return (
    <section className="search page_side_paddings">
      <form className="search-bar">
        <fieldset className="search-bar__wrapper">
          <input className="search-bar__search" type="search" name="search-bar__search" id="search-bar__search" placeholder="Фильм" />
          <input className="button search-bar__submit" type="submit" value="" />
        </fieldset>
        <div className="search-bar__sidepanel">
          <input className="search-bar__switch" type="checkbox" name="shortfilm" id="shortfilm" />
          <label className="search-bar__label" htmlFor="shortfilm">Короткометражки</label>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;