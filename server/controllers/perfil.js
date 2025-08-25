const pool = require('../models/database')
const bcrypt = require('bcrypt')

async function getUserById(id) {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
    return rows[0]; // retorna o usuário ou undefined
}

exports.editPerfil = async (req, res) => {
    try {
        const {id} = req.params
        const { nome, email, senha, telefone, endereco, perfil } = req.body

        // Verificação básica
        if (!id) {
            return res.status(400).json({ error: 'ID do usuário é obrigatório' })
        }

        //Ache o usuario
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Se veio senha nova, gera hash, senão mantém a antiga
        let hashedPassword = user.senha;
        if (senha) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(String(senha), salt);
        }

        // Atualizar dados no banco
        const [result] = await pool.query(
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

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }

        return res.status(200).json({ message: 'Perfil atualizado com sucesso' })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao atualizar perfil' })
    }
}