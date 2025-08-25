const pool = require('../models/database');
const bcrypt = require('bcrypt');

async function getUserById(id) {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
    return rows[0]; // retorna o usuário ou undefined
}

exports.editPerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, telefone, endereco, perfil, funcao } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'ID do usuário é obrigatório' });
        }

        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Hash da senha se foi fornecida
        let hashedPassword = user.senha;
        if (senha) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(String(senha), salt);
        }

        // Atualiza tabela usuario
        const [resultUser] = await pool.query(
            `UPDATE usuario
             SET nome = ?, email = ?, senha = ?, telefone = ?, endereco = ?, perfil = ?
             WHERE id = ?`,
            [
                nome || user.nome,
                email || user.email,
                hashedPassword,
                telefone || user.telefone,
                endereco || user.endereco,
                perfil || user.perfil,
                id
            ]
        );

        if (resultUser.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Atualiza tabela cliente ou funcionario
        if ((perfil || user.perfil) === 'cliente') {
            await pool.query(
                `UPDATE cliente SET id = ? WHERE id = ?`,
                [id, id] // apenas para manter relacionamento, não há outros campos
            );
        } else if ((perfil || user.perfil) === 'funcionario') {
            await pool.query(
                `UPDATE funcionario SET funcao = ?, agenda_id = ? WHERE id = ?`,
                [funcao || 'Padrão', 1, id] // agenda_id padrão 1
            );
        }

        return res.status(200).json({ message: 'Perfil atualizado com sucesso' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
};
