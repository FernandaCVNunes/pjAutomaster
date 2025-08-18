import React from 'react';
import MasterPage from './mastepage';

const App = () => {
  return (
    <MasterPage>
      {/* Aqui é onde o conteúdo da sua página vai */}
      <section className="content-section">
        <h1>Bem-vindo à AutoMaster!</h1>
        <p>
          Sua oficina de confiança para reparos e serviços automotivos.
          Navegue por nossa página para saber mais sobre nossos serviços e
          como podemos ajudar você a manter seu carro em perfeitas condições.
        </p>
      </section>
    </MasterPage>
  );
};

export default App;