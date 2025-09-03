import React, { useState, useEffect } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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
        <img src="https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-5%2F725%2F1528725%2F01Y0yIm7%2Fb5cd7f0df5144dc182e3e9ed8c148ee3&methods=resize%2C500%2C5000" alt="Logo Inove Mais Baterias" className="logo-image" />
      </a>

      <nav className="main-nav">
        <a href="#solucoes">Soluções</a>
        <a href="#projetos">Projetos</a>
        <a href="#sobre-nos">Sobre Nós</a>
        <a href="#contato">Contato</a>
        <a href="#" onClick={scrollToTop} className={`nav-back-to-top ${isScrolled ? 'show' : ''}`}>Voltar ao Topo</a>
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
            <a href="#sobre-nos" onClick={toggleMobileMenu}>Sobre Nós</a>
            <a href="#contato" onClick={toggleMobileMenu}>Contato</a>
        </div>
      </div>
    </header>
  );
}