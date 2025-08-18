import React from 'react';
import logoHeader from '../img/Logotipo.jpg'; // Importa a imagem

const Header = () => {
  return (
    <header className="automaster-header">
      <div className="header-container">
        <div className="logo-container">
          {/* Usa a variável importada como a fonte da imagem */}
          <img src={logoHeader} alt="Logo AutoMaster" className="logo-img" />
          <span className="logo-text">AUTOMASTER</span>
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="/" className="nav-link nav-active">HOME</a></li>
            <li><a href="/" className="nav-link">SOBRE NÓS</a></li>
            <li><a href="/" className="nav-link nav-button">ENTRAR</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;