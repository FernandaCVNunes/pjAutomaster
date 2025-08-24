// Arquivo: pjautomaster/server/index.js
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const veiculoRoutes = require('./routes/veiculoRoutes')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Exemplo de rota de agendamentos
app.get('/api/events', (req, res) => {
  res.json([
    { id: 1, title: 'Troca de Óleo', start: '2025-08-18T10:00:00' }
  ])
})

app.use('/api', veiculoRoutes)

app.listen(PORT, () => {
  console.log(`Servidor de agenda rodando em http://localhost:${PORT}`)
})
