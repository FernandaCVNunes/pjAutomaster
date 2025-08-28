import React from 'react';

const SobreNos = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Sobre Nós</h1>
      <div className="row align-items-center">
        <div className="col-md-5 mb-3">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70" 
            alt="Oficina Mecânica" 
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-5 ms-5">
          <h3>Quem Somos</h3>
          <p className="fs-6">
            Somos uma oficina mecânica especializada em manutenção preventiva e 
            corretiva de veículos de todas as marcas. Nosso compromisso é oferecer 
            um atendimento de qualidade, com transparência e confiança.
          </p>
          <h3>Nossa Missão</h3>
          <p className="fs-6">
            Garantir a segurança e tranquilidade de nossos clientes, entregando 
            serviços automotivos com excelência, sempre utilizando peças de 
            qualidade e mão de obra especializada.
          </p>
          <h3>Por que escolher nossa oficina?</h3>
          <ul>
            <li>Equipe altamente qualificada</li>
            <li>Peças de primeira linha</li>
            <li>Atendimento rápido e transparente</li>
            <li>Preços justos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SobreNos;