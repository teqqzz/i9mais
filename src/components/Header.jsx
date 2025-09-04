import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { FaTimes } from 'react-icons/fa';

export function Header({ isHomePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setScrolled(window.scrollY > 50);
      } else {
        setScrolled(true);
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

  const headerClass = `main-header ${scrolled ? 'scrolled' : ''} ${!isHomePage ? 'solid-background' : ''}`;

  return (
    <header className={headerClass}>
      <Link to="/" className="logo-link" onClick={closeMenu}>
        <img src="/logo-i9+.png" alt="i9+ Baterias" className="logo-image" />
      </Link>

      <nav className="main-nav">
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/#solucoes" onClick={closeMenu}>Soluções</Link>
        <Link to="/#projetos" onClick={closeMenu}>Projetos</Link>
        <Link to="/#blog" onClick={closeMenu}>Blog</Link>
        <Link to="/#contato" onClick={closeMenu}>Contato</Link>
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
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/#solucoes" onClick={closeMenu}>Soluções</Link>
          <Link to="/#projetos" onClick={closeMenu}>Projetos</Link>
          <Link to="/#blog" onClick={closeMenu}>Blog</Link>
          <Link to="/#contato" onClick={closeMenu}>Contato</Link>
        </nav>
      </div>
    </header>
  );
}