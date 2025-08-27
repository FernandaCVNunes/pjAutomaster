const pool = require('../models/database')

exports.agendar = async (req, res) => {
    try {
        const { data, horario, servico, veiculo_id } = req.body

        // Validação simples
        if (!data || !horario || !servico || !veiculo_id) {
            return res.status(400).json({ error: "Preencha todos os campos obrigatórios." })
        }

        // Verificar se o veículo existe
        const veiculo = await pool.query(
            "SELECT * FROM veiculo WHERE id = ?",
            [veiculo_id]
        )

        if (veiculo.length === 0) {
            return res.status(404).json({ error: "Veículo não encontrado." })
        }

        // Montar data + hora para salvar em datetime do MySQL
        const dataHora = `${data} ${horario}:00` // Ex: "2025-08-27 09:00:00"

        // Inserir agendamento no banco
        const [result] = await pool.query(
            "INSERT INTO agendamento (dataHora, servico, status, veiculo_id) VALUES (?, ?, ?, ?)",
            [dataHora, servico, "pendente", veiculo_id]
        )

        return res.status(201).json({
            message: "Agendamento realizado com sucesso!",
            agendamento: {
                id: result.insertId,
                dataHora,
                servico,
                status: "pendente",
                veiculo_id
            }
        })

    } catch (error) {
        console.error("Erro ao agendar:", error)
        return res.status(500).json({ error: "Erro no servidor ao agendar." })
    }
}