import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importe todas as suas páginas
import Home from './home'; 
import AreaFuncionario from './pages/areafuncionario.jsx';
import RegistroVeiculo from './pages/registroveiculo';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/areafuncionario" element={<AreaFuncionario />} />
      <Route path="/registroveiculo" element={<RegistroVeiculo />} />
    </Routes>
  );
};

export default App;