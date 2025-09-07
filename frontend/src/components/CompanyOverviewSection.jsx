import React, { useState, useEffect } from 'react';

// Componente Header com navegação e botão de voltar ao topo
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        setShowBackToTop(window.scrollY > heroSection.offsetHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <a href="/" className="logo-link">
        <img src="m.pnj" alt="Logo Inove Mais Baterias" className="logo-image" />
      </a>

      <nav className="main-nav">
        <a href="#solucoes">Soluções</a>
        <a href="#projetos">Projetos</a>
        <a href="#blog">Blog</a>
        <a href="#parceiros">Parceiros</a>
        <a href="#contato">Sobre & Contato</a>
        <a href="#" onClick={scrollToTop} className={`nav-back-to-top ${showBackToTop ? 'show' : ''}`}>Voltar ao Topo</a>
      </nav>

      <button className={`hamburger-btn ${isMobileMenuOpen ? 'is-hidden' : ''}`} onClick={toggleMobileMenu} aria-label="Abrir menu">
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <div className={`mobile-nav ${isMobileMenuOpen ? 'is-open' : ''}`}>
        <button className="close-btn" onClick={toggleMobileMenu} aria-label="Fechar menu">
          &times;
        </button>
        <div className="mobile-nav-links">
            <a href="#solucoes" onClick={toggleMobileMenu}>Soluções</a>
            <a href="#projetos" onClick={toggleMobileMenu}>Projetos</a>
            <a href="#blog" onClick={toggleMobileMenu}>Blog</a>
            <a href="#parceiros" onClick={toggleMobileMenu}>Parceiros</a>
            <a href="#contato" onClick={toggleMobileMenu}>Sobre & Contato</a>

            <a href="#" onClick={(e) => { scrollToTop(e); toggleMobileMenu(); }}>Voltar ao Topo</a>
        </div>
      </div>
    </header>
  );
}