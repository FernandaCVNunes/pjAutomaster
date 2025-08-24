// Arquivo: pjautomaster/server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const veiculoRoutes = require('./routes/veiculoRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Exemplo de rota de agendamentos
app.get('/api/events', (req, res) => {
  // Aqui você fará a chamada ao seu 'controller' para buscar os dados do banco
  res.json([
    { id: 1, title: 'Troca de Óleo', start: '2025-08-18T10:00:00' }
  ]);
});
app.use('/api', veiculoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor de agenda rodando em http://localhost:${PORT}`);
});