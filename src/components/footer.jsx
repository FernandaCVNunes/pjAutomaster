import React from 'react';
import logoFooter from '../img/Logo.png'; // Importa a imagem do rodapé

const Footer = () => {
  return (
    <footer className="automaster-footer">
      <div className="footer-container">
        <div className="footer-column">
          {/* Usa a variável importada como a fonte da imagem */}
          <img src={logoFooter} alt="Logo AutoMaster" className="logo-img" />
        </div>
        <div className="footer-column">
          <nav className="footer-nav">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/">Sobre Nós</a></li>
              <li><a href="/">Entrar</a></li>
              <li><a href="/">Contatos</a></li>
            </ul>
          </nav>
        </div>
        <div className="footer-column">
          <p className="copyright-text">Copyright &copy;2025 oficinaautomaster</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;