import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, requiredPerfil, children }) => {
  if (!user) {
    // Se não há usuário logado, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }
  
  if (user.perfil !== requiredPerfil) {
    // Se o perfil do usuário não é o que a rota exige, redireciona para a home
    return <Navigate to="/" replace />;
  }

  // Se o usuário está logado e tem o perfil correto, renderiza o componente filho
  return children;
};

export default PrivateRoute;