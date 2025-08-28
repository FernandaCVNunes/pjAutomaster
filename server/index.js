// Arquivo: pjautomaster/server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');
const agendaRoutes = require('./routes/agendaRoutes');


const app = express();
const PORT = 3001;

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', veiculoRoutes);
app.use('/api', agendaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor de agenda rodando em http://localhost:${PORT}`);
});