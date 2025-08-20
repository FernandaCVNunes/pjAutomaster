import React from 'react';
import MasterPage from './MasterPage';
import backgroundImage from './img/home_backgroud.png'; // Importa a imagem

const Home = () => {
  return (
    <MasterPage>
      {/* Container principal para a home com a classe 'home-container' */}
      <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <section className="text-content">
          <h1>Bem-vindo à AutoMaster!</h1>
          <p>Sua oficina de confiança para reparos e serviços automotivos.
          </p>
          <p>
            Navegue por nossa página para saber mais sobre nossos serviços e
            como podemos ajudar você a manter seu carro em perfeitas condições.
          </p>
        </section>
      </div>
    </MasterPage>
  );
};

export default Home;

          