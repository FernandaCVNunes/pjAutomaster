import React from 'react';
import MasterPage from '../MasterPage';


const RegistroVeiculo = () => {
  return (
    <MasterPage>
      <section className="vehicle-form-content">
        <h1>Registro de Veículos</h1>
        <form>
          <div>
            <label htmlFor="placa">Placa do Veículo:</label>
            <input type="text" id="placa" name="placa" required />
          </div>
          <button type="submit">Registrar</button>
        </form>
      </section>
    </MasterPage>
  );
};

export default RegistroVeiculo;