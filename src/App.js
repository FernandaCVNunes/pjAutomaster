import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importe todas as suas páginas
import Home from './home'; // Vamos criar este arquivo para a Home

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;