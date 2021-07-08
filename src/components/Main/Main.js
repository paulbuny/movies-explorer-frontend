import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import { useRef } from 'react';

function Main(props) {
  const scrollRef = useRef(null);

  function executeScroll () {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Header history={props.history} loggedIn={props.loggedIn} />
      <main>
        <Promo handlerOnClick={executeScroll} />
        <AboutProject scrollRef={scrollRef}/>
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}

export default Main;