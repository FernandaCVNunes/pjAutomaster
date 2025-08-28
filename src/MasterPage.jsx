import React from 'react';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'; 

const MasterPage = ({ user, onLogout, children }) => {
  return (
    <div>
      {/* O Header está aqui e recebe os props para saber o estado do login */}
      <Header user={user} onLogout={onLogout} />
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