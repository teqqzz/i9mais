import React from 'react';

export function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h4>Vamos nos conectar?</h4>
            <ul>
              <li><a href="https://www.facebook.com/profile.php?id=100085606369147&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.instagram.com/inovemais.baterias" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.linkedin.com/in/inovemais-baterias-el%C3%A9tricas-e-energias-2479bb266/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Endereço</h4>
            <p>Curitiba, BR</p>
          </div>
          <div className="footer-column">
            <h4>Contato</h4>
            <p>comercial@inovemais.tec.br</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} i9+ Baterias</p>
        </div>
      </div>
    </footer>
  );
}