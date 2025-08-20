import React from 'react';
import MasterPage from '../MasterPage';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap

const AreaFuncionario = () => {
  return (
    <MasterPage>
      {/* Container fluido para layout responsivo */}
      <div className="container-fluid py-5 text-center employee-area">
        <h1 className="display-4 fw-bold mb-4">Área do Funcionário</h1>
        <p className="lead">
          Bem-vindo à área restrita. Gerencie registros e informações aqui.
        </p>
        
        {/* Adicione outros componentes aqui, como cards ou tabelas */}
      </div>
    </MasterPage>
  );
};

export default AreaFuncionario;