import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Criando o contexto
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, perfil, nome, email }
  const [token, setToken] = useState(null);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser({ id: decoded.id, perfil: decoded.perfil, nome: decoded.nome, email: decoded.email });
        setToken(storedToken);
      } catch (err) {
        console.error('Token inválido', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Função de login
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};