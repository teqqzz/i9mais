import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackToTopButton } from './components/BackToTopButton';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      document.body.classList.add('internal-page');
    } else {
      document.body.classList.remove('internal-page');
    }
    return () => {
      document.body.classList.remove('internal-page');
    };
  }, [isHomePage]);


  return (
    <>
      <ScrollToTop />
      <Header isHomePage={isHomePage} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
}

export default App;