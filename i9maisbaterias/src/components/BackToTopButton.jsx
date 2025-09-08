import React, { useState, useEffect } from 'react';

// Botão "Voltar ao Topo"
export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

// Função para rolar suavemente ao topo
  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <a href="#" onClick={scrollToTop} id="backToTopBtn" className={`back-to-top ${isVisible ? 'show' : ''}`} title="Voltar ao topo">
      &#8679;
    </a>
  );
}