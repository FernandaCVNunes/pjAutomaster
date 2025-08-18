import React from 'react';
import MasterPage from './mastepage'; // Importa a MasterPage

const Home = () => {
  return (
    <MasterPage> {/* Envolve o conteúdo da página com a MasterPage */}
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

export default Home;