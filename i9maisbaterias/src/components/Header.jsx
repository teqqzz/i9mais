import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { HashLink } from 'react-router-hash-link';

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
   setShowBackToTopLink(window.scrollY > heroHeight);
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); 
  return () => window.removeEventListener('scroll', handleScroll);
 }, [isHomePage]); 

  useEffect(() => {
    return () => {
      document.body.classList.remove('mobile-menu-is-open');
    };
  }, []);

  const toggleMenu = () => {
    const nextStateIsOpen = !menuOpen;
    setMenuOpen(nextStateIsOpen);
    if (nextStateIsOpen) {
      document.body.classList.add('mobile-menu-is-open');
    } else {
      document.body.classList.remove('mobile-menu-is-open');
    }
  };

 const closeMenu = () => {
  setMenuOpen(false);
    document.body.classList.remove('mobile-menu-is-open'); 
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
    <img src="/images/logo-i9+.png" alt="i9+ Baterias" className="logo-image" />
   </Link>
   
   <nav className="main-nav">
        <HashLink smooth to="/#solucoes">Soluções</HashLink>
        <HashLink smooth to="/#impacto">Impacto</HashLink>
        <HashLink smooth to="/#calculadora">Calculadora</HashLink>
        <HashLink smooth to="/#blog">Blog</HashLink>
        <HashLink smooth to="/#contato">Contato</HashLink>
    <a href="#" onClick={scrollToTop} className={`nav-back-to-top ${showBackToTopLink ? 'show' : ''}`}>Voltar ao Topo</a>
   </nav>

   <button className={`hamburger-btn ${menuOpen ? 'is-hidden' : ''}`} onClick={toggleMenu} aria-label="Abrir menu">
    <span className="hamburger-line"></span>
    <span className="hamburger-line"></span>
    <span className="hamburger-line"></span>
   </button>

   <div className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
    <button className="close-btn" onClick={toggleMenu} aria-label="Fechar menu"><FaTimes /></button>
    <nav className="mobile-nav-links">
            <HashLink smooth to="/#solucoes" onClick={closeMenu}>Soluções</HashLink>
            <HashLink smooth to="/#impacto" onClick={closeMenu}>Impacto</HashLink>
            <HashLink smooth to="/#calculadora" onClick={closeMenu}>Calculadora</HashLink>
            <HashLink smooth to="/#blog" onClick={closeMenu}>Blog</HashLink>
            <HashLink smooth to="/#contato" onClick={closeMenu}>Contato</HashLink>
    </nav>
   </div>
  </header>
 );
}