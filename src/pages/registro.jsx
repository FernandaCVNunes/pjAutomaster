import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoHeader from '../img/Logotipo.jpg';

const Registro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    cpf: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validação das senhas
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    // Validação do CPF (formato básico)
    if (formData.cpf.length !== 11) {
      setError('CPF deve ter 11 dígitos');
      setLoading(false);
      return;
    }

    try {
      // Aqui você fará a chamada para a API de registro
      const response = await fetch('http://localhost:3001/api/auth/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          telefone: formData.telefone,
          cpf: formData.cpf
        })
      });

      if (response.ok) {
        setSuccess('Conta criada com sucesso! Redirecionando para login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao criar conta');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <div className="registro-header">
          <img src={logoHeader} alt="Logo AutoMaster" className="registro-logo" />
          <h1>Criar Conta</h1>
          <p>Preencha os dados para se registrar</p>
        </div>

        <form onSubmit={handleSubmit} className="registro-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Digite seu nome completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
                placeholder="00000000000"
                maxLength="11"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
                placeholder="Digite sua senha"
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar Senha</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required
                placeholder="Confirme sua senha"
                minLength="6"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="registro-button"
            disabled={loading}
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <div className="registro-footer">
          <p>Já tem uma conta? <Link to="/login" className="link-login">Faça login</Link></p>
          <Link to="/" className="link-voltar">← Voltar para Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
