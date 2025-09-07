import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackToTopButton } from './components/BackToTopButton';
import { useEffect } from 'react';

// Componente para rolar ao topo em mudanças de rota
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Componente Principal do App
function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Adiciona ou remove a classe 'internal-page' no body com base na rota
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

// Renderiza o layout com Header, Footer e o conteúdo da rota atual
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