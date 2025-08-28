import React from 'react';
import backgroundImage from './img/home_backgroud.png';

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <section className="text-content">
        <h1>Bem-vindo à AutoMaster!</h1>
        <p>Sua oficina de confiança para reparos e serviços automotivos.</p>
        <p>
          Navegue por nossa página para saber mais sobre nossos serviços e
          como podemos ajudar você a manter seu carro em perfeitas condições.
        </p>
      </section>
    </div>
  );
};

export default Home;  