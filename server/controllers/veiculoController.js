const pool = require('../models/database'); // Certifique-se de que o caminho está correto

// Função para registrar um novo veículo
exports.createVeiculo = async (req, res) => {
    const { marca, modelo, ano, placa, proprietario } = req.body;

    if (!placa || !marca) {
        return res.status(400).json({ error: 'Marca e placa são campos obrigatórios.' });
    }

    try {
        const query = 'INSERT INTO veiculos (marca, modelo, ano, placa, proprietario) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.execute(query, [marca, modelo, ano, placa, proprietario]);

        res.status(201).json({ message: 'Veículo registrado com sucesso!', id: result.insertId });
    } catch (err) {
        console.error('Erro ao registrar o veículo:', err);
        res.status(500).json({ error: 'Erro no servidor ao registrar o veículo.' });
    }
};