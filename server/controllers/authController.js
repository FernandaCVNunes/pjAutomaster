const pool = require('../models/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função auxiliar para verificar se o e-mail já existe
async function getUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
    return rows[0];
}

// Função auxiliar para verificar se o CPF já existe
async function getUserByCPF(cpf) {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE cpf = ?', [cpf]);
    return rows[0];
}

// Função para registrar usuário
exports.registro = async (req, res) => {
    const { nome, email, senha, telefone, cpf, endereco, perfil } = req.body;

    if (!nome || !email || !senha || !telefone || !cpf || !endereco || !perfil) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    if (!['cliente', 'funcionario'].includes(perfil)) {
        return res.status(400).json({ error: "O campo 'perfil' deve ser 'cliente' ou 'funcionario'." });
    }

    if (senha.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    try {
        const existingEmail = await getUserByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
        }

        const existingCPF = await getUserByCPF(cpf);
        if (existingCPF) {
            return res.status(400).json({ error: 'Este CPF já está cadastrado.' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const query = `
            INSERT INTO usuario (nome, email, senha, telefone, cpf, endereco, perfil, data_criacao)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
        `;
        const [result] = await pool.execute(query, [nome, email, hashedPassword, telefone, cpf, endereco, perfil]);

        return res.status(201).json({ message: 'Usuário criado com sucesso!', userId: result.insertId });
    } catch (err) {
        console.error('Erro ao registrar usuário:', err);
        return res.status(500).json({ error: 'Erro no servidor ao registrar o usuário.' });
    }
};

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    // Busca usuário pelo email
    const [rows] = await pool.execute('SELECT * FROM usuario WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verifica senha
    const match = await bcrypt.compare(senha, user.senha);
    if (!match) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Cria token JWT
    const token = jwt.sign(
      {
        id: user.id,
        nome: user.nome,
        perfil: user.perfil
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    await pool.execute('UPDATE usuario SET token = ? WHERE id = ?', [token, user.id]);

    return res.status(200).json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        perfil: user.perfil
      }
    });

  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
};