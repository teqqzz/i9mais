import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

// Componente Header com navegação e botão de voltar ao topo
export function Header({ isHomePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTopLink, setShowBackToTopLink] = useState(false); 

// Efeito para monitorar o scroll da página
  useEffect(() => {
    const handleScroll = () => {
      const isScrolledDown = window.scrollY > 10;
      const heroSection = document.querySelector('.hero-section');
      let heroHeight = heroSection ? heroSection.offsetHeight : 800; 

      setScrolled(isScrolledDown);
      
//  Mostrar link "Voltar ao Topo" se a página não for a home e o scroll passar da altura do hero
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


// Função para abrir o menu móvel
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

// Função para fechar o menu móvel
  const closeMenu = () => {
    setMenuOpen(false);
  };

// Função para rolar suavemente ao topo
  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu(); 
  };

  // Definir classes CSS dinamicamente
  const headerClass = `main-header ${scrolled ? 'scrolled' : ''} ${!isHomePage ? 'solid-background' : ''}`;

  return (
    <header className={headerClass}>
      <Link to="/" className="logo-link" onClick={closeMenu}>
        <img src="/images/logo-i9+.png" alt="i9+ Baterias" className="logo-image" />
      </Link>
      
      {/* --- MENU DESKTOP ATUALIZADO --- */}
      <nav className="main-nav">
        <a href="#solucoes">Soluções</a>
        <a href="#impacto">Impacto</a>
        <a href="#calculadora">Calculadora</a>
        <a href="#blog">Blog</a>
        <a href="#contato">Contato</a>
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
        {/* --- MENU MOBILE ATUALIZADO --- */}
        <nav className="mobile-nav-links">
          <a href="#solucoes" onClick={toggleMenu}>Soluções</a>
          <a href="#estudos-de-caso" onClick={toggleMenu}>Estudos de Caso</a>
          <a href="#impacto" onClick={toggleMenu}>Impacto</a>
          <a href="#calculadora" onClick={toggleMenu}>Calculadora</a>
          <a href="#roadmap" onClick={toggleMenu}>Roadmap</a>
          <a href="#blog" onClick={toggleMenu}>Blog</a>
          <a href="#contato" onClick={toggleMenu}>Contato</a>
        </nav>
      </div>
    </header>
  );
}
