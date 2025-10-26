import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackToTopButton } from './components/BackToTopButton';

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
  const [developerCreditHtml, setDeveloperCreditHtml] = useState('');

  useEffect(() => {
    const encodedCredit = 'RGVzZW52b2x2aWRvIHBvciA8YSBocmVmPSJodHRwczovL2dpdGh1Yi5jb20vdGVxcXp6IiB0YXJnZXQ9Il9ibGFuayIgcmVsPSJub29wZW5lciBub3JlZmVycmVyIj5MdWNhczwvYT4=';
    
    try {
      setDeveloperCreditHtml(atob(encodedCredit));
    } catch (e) {
      console.error("Falha ao decodificar os créditos.", e);
      setDeveloperCreditHtml('Desenvolvido por Lucas'); 
    }

    // Mensagem no console
    const style = 'font-size: 14px; background: #021029; color: #fff; padding: 5px 10px; border-radius: 5px;';
    console.log('%Desenvolvido por Lucas (github.com/teqqzz)', style);

  }, []); // Roda apenas uma vez
  // --- FIM DA LÓGICA DO CRÉDITO ---


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

      <div 
        className="fixed-developer-credit" 
        dangerouslySetInnerHTML={{ __html: developerCreditHtml }} 
      />
  </>
 );
}

export default App;