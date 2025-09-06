import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

export function Header({ isHomePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTopLink, setShowBackToTopLink] = useState(false); 

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledDown = window.scrollY > 10;
      const heroSection = document.querySelector('.hero-section');
      let heroHeight = heroSection ? heroSection.offsetHeight : 800; 

      setScrolled(isScrolledDown);
      

      if (window.scrollY > heroHeight) {
        setShowBackToTopLink(true);
      } else {
        setShowBackToTopLink(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu(); 
  };

  const headerClass = `main-header ${scrolled ? 'scrolled' : ''} ${!isHomePage ? 'solid-background' : ''}`;

  return (
    <header className={headerClass}>
      <Link to="/" className="logo-link" onClick={closeMenu}>
        <img src="/public/images/logo-i9+.png" alt="i9+ Baterias" className="logo-image" />
      </Link>

      <nav className="main-nav">
        <a href="#solucoes">Soluções</a>
        <a href="#projetos">Projetos</a>
        <a href="#blog">Blog</a>
        <a href="#contato">Sobre & Contato</a>
        <a href="#" onClick={scrollToTop} className={`nav-back-to-top ${showBackToTopLink ? 'show' : ''}`}>Voltar ao Topo</a>
      </nav>

      <button className={`hamburger-btn ${menuOpen ? 'is-hidden' : ''}`} onClick={toggleMenu} aria-label="Abrir menu">
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <div className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
        <button className="close-btn" onClick={toggleMenu} aria-label="Fechar menu">
          <FaTimes />
        </button>
        <nav className="mobile-nav-links">
          <a href="#solucoes" onClick={toggleMenu}>Soluções</a>
          <a href="#projetos" onClick={toggleMenu}>Projetos</a>
          <a href="#blog" onClick={toggleMenu}>Blog</a>
          <a href="#contato" onClick={toggleMenu}>Sobre & Contato</a>
        </nav>
      </div>
    </header>
  );
}