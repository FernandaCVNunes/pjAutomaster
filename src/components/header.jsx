import React from 'react';
import { Link } from 'react-router-dom';
import logoHeader from '../img/Logotipo.jpg'; 

const Header = () => {
  return (
    <header className="automaster-header">
      <div className="header-container">
        <div className="logo-container">
          <img src={logoHeader} alt="Logo AutoMaster" className="logo-img" />
          <span className="logo-text">AUTOMASTER</span>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/" className="nav-link nav-active">HOME</Link></li>
            <li><Link to="/sobrenos" className="nav-link">SOBRE NÓS</Link></li>
            <li><Link to="/login" className="nav-link nav-button">ENTRAR</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;