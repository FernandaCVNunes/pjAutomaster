import React from 'react';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';

// Onde os estilos serão aplicados globalmente
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'; 

const MasterPage = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="separator-line"></div>
      <main className="main-content">
        {children}
      </main>
      <div className="separator-line"></div>
      <Footer />
    </div>
  );
};

export default MasterPage;