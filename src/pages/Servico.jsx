import React from 'react';
import '../css/Servico.css';

const Servico = () => {
  return (
    <div className="service-order-form">
            <h1>Criar e Editar Ordem de Serviço</h1>

            <form>
                {/* Client & Vehicle Section */}
                <div className="form-group">
                    <label htmlFor="client">Cliente</label>
                    <div className="select-wrapper">
                        <select id="client">
                            <option selected disabled>Selecione</option>
                            <option value="1">Cliente A</option>
                            <option value="2">Cliente B</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="vehicle">Veículo</label>
                    <div className="select-wrapper">
                        <select id="vehicle">
                            <option selected disabled>Selecione</option>
                            <option value="1">Veículo X</option>
                            <option value="2">Veículo Y</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="diagnosis">Diagnóstico do Veículo</label>
                    <textarea id="diagnosis"></textarea>
                </div>

                {/* Parts & Costs Section */}
                <h2>Peças e Custos</h2>
                
                <table className="costs-table">
                    <thead>
                        <tr>
                            <th>Peça</th>
                            <th className="col-quantity">Quantidade</th>
                            <th className="col-unit-cost">Custo Unitário</th>
                            <th className="col-total-cost">Custo Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Filtro de óleo</td>
                            <td>1</td>
                            <td>R$ 25,00</td>
                            <td>R$ 25,00</td>
                        </tr>
                        <tr>
                            <td>Pastilhas de freio</td>
                            <td>2</td>
                            <td>R$ 80,00</td>
                            <td>R$ 160,00</td>
                        </tr>
                        <tr>
                            <td>Mão de obra</td>
                            <td>1</td>
                            <td>R$ 150,00</td>
                            <td>R$ 150,00</td>
                        </tr>
                    </tbody>
                </table>

                <div className="button-group">
                    <button type="button" className="btn btn-secondary">Remover</button>
                    <button type="button" className="btn btn-primary">Adicionar</button>
                </div>

                {/* Status Section */}
                <div className="form-group" style={{ marginTop: '2.5rem' }}>
                    <label htmlFor="status">Status da OS</label>
                     <div className="select-wrapper">
                        <select id="status">
                            <option selected disabled>Selecione o status</option>
                            <option value="1">Aguardando Aprovação</option>
                            <option value="2">Em Andamento</option>
                            <option value="3">Concluído</option>
                        </select>
                    </div>
                </div>

                {/* Footer / Submit Button */}
                <div className="form-footer">
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </div>
            </form>
        </div>
  );
};

export default Servico;
