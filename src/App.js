import React, { useContext, useEffect } from 'react';
import backgroundImage from './img/home_backgroud.png';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return;

    fetch("http://localhost:3000/auth/validate", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Token inválido");
        return res.json();
      })
      .then(data => {
        // usa o login do contexto
        login(data.user, storedToken);
      })
      .catch(() => {
        // se falhar, faz logout
        logout();
      });
  }, [login, logout]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <section 
      className="content-section"  
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1>Bem-vindo à AutoMaster!</h1>
      <p>
        Sua oficina de confiança para reparos e serviços automotivos.
        Navegue por nossa página para saber mais sobre nossos serviços e
        como podemos ajudar você a manter seu carro em perfeitas condições.
      </p>
    </section>
  );
};

export default App;