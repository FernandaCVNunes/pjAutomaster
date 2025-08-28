import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa as páginas e layout
import MasterPage from './MasterPage.jsx';
import Home from './home.jsx';
import Login from './pages/login.jsx';
import Registro from './pages/registro.jsx';
import SobreNos from './pages/sobrenos.jsx';
import Contato from './pages/contatos.jsx';
import AreaFuncionario from './pages/areafuncionario.jsx';
import AreaCliente from './pages/areacliente.jsx';
import RegistroVeiculo from './pages/registroveiculo.jsx';
import Dashboard from './pages/dashboard.jsx';

// Importa o componente PrivateRoute
import PrivateRoute from './PrivateRoute.jsx';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Falha ao analisar os dados do usuário do localStorage:", error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLoginSuccess = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <Routes>
      {/* ROTAS PÚBLICAS COM O LAYOUT DA MASTERPAGE */}
      <Route path="/" element={<MasterPage user={user} onLogout={handleLogout}><Home /></MasterPage>} />
      <Route path="/sobrenos" element={<MasterPage user={user} onLogout={handleLogout}><SobreNos /></MasterPage>} />
      <Route path="/contatos" element={<MasterPage user={user} onLogout={handleLogout}><Contato /></MasterPage>} />
      
      {/* ROTAS PÚBLICAS SEM O LAYOUT (login e registro) */}
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        
      {/* ROTAS PROTEGIDAS PARA FUNCIONÁRIOS (com o layout da MasterPage) */}
      <Route 
        path="/areafuncionario" 
        element={
          <PrivateRoute user={user} requiredPerfil="funcionario">
            <MasterPage user={user} onLogout={handleLogout}><AreaFuncionario /></MasterPage>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/registroveiculo" 
        element={
          <PrivateRoute user={user} requiredPerfil="funcionario">
            <MasterPage user={user} onLogout={handleLogout}><RegistroVeiculo /></MasterPage>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute user={user} requiredPerfil="funcionario">
            <MasterPage user={user} onLogout={handleLogout}><Dashboard /></MasterPage>
          </PrivateRoute>
        } 
      />

      {/* ROTA PROTEGIDA PARA CLIENTES (com o layout da MasterPage) */}
      <Route 
        path="/areacliente" 
        element={
          <PrivateRoute user={user} requiredPerfil="cliente">
            <MasterPage user={user} onLogout={handleLogout}><AreaCliente /></MasterPage>
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

export default App;