import React, { useState } from 'react';
import MasterPage from '../MasterPage';

const RegistroVeiculo = () => {
    // 1. Crie o estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        placa: '',
        marca: '',
        modelo: '',
        ano: '',
        proprietario: ''
    });

    // 2. Crie uma função para atualizar o estado quando o usuário digitar
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 3. Crie uma função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/veiculos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Veículo registrado com sucesso!');
                // Limpar o formulário
                setFormData({
                    placa: '',
                    marca: '',
                    modelo: '',
                    ano: '',
                    proprietario: ''
                });
            } else {
                alert(`Erro: ${result.error}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro de conexão com o servidor.');
        }
    };

    return (
        <MasterPage>
            <section className="vehicle-form-content">
                <h1>Registro de Veículos</h1>
                {/* Adicione o evento onSubmit e os inputs */}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="placa">Placa do Veículo:</label>
                        <input
                            type="text"
                            id="placa"
                            name="placa"
                            value={formData.placa}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="marca">Marca:</label>
                        <input
                            type="text"
                            id="marca"
                            name="marca"
                            value={formData.marca}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="modelo">Modelo:</label>
                        <input
                            type="text"
                            id="modelo"
                            name="modelo"
                            value={formData.modelo}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="ano">Ano:</label>
                        <input
                            type="number"
                            id="ano"
                            name="ano"
                            value={formData.ano}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="proprietario">Proprietário:</label>
                        <input
                            type="text"
                            id="proprietario"
                            name="proprietario"
                            value={formData.proprietario}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Registrar</button>
                </form>
            </section>
        </MasterPage>
    );
};

export default RegistroVeiculo;