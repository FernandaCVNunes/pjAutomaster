const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Importa o pool de conexões, não o módulo mysql
const pool = require('../models/database.js'); 

// Rota de registro
router.post('/registro', async (req, res) => {
  try {
    const { nome, email, senha, telefone, cpf } = req.body;

    // Validações básicas
    if (!nome || !email || !senha || !telefone || !cpf) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    if (senha.length < 6) {
      return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
    }

    // Verificar se o email já existe
    // Use o pool.execute() diretamente
    const [existingUsers] = await pool.execute(
      'SELECT id FROM usuario WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Este e-mail já está cadastrado' });
    }

    // Verificar se o CPF já existe
    // Use o pool.execute() diretamente
    const [existingCPF] = await pool.execute(
      'SELECT id FROM usuario WHERE cpf = ?',
      [cpf]
    );

    if (existingCPF.length > 0) {
      return res.status(400).json({ message: 'Este CPF já está cadastrado' });
    }

    // Criptografar a senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    // Inserir novo usuário
    const [result] = await pool.execute(
      'INSERT INTO usuario (nome, email, senha, telefone, cpf, data_criacao) VALUES (?, ?, ?, ?, ?, NOW())',
      [nome, email, hashedPassword, telefone, cpf]
    );

    res.status(201).json({ 
      message: 'Usuário criado com sucesso',
      userId: result.insertId 
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validações básicas
    if (!email || !senha) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
    }

    // Buscar usuário pelo email
    // Use o pool.execute() diretamente
    const [users] = await pool.execute(
      'SELECT id, nome, email, senha, telefone, cpf FROM usuario WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos' });
    }

    const user = users[0];

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        nome: user.nome 
      },
      'seu_secret_key_aqui', // Lembre-se de usar uma variável de ambiente!
      { expiresIn: '24h' }
    );

    // Remover a senha do objeto de resposta
    delete user.senha;

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para verificar token (proteger rotas)
router.get('/verificar', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, 'seu_secret_key_aqui'); // Lembre-se de usar uma variável de ambiente!
    
    res.json({
      valid: true,
      user: decoded
    });

  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
});

module.exports = router;