# Auto Master - Agenda (Node.js + MySQL + FullCalendar)

Projeto montado a partir dos arquivos fornecidos (PDFs técnicos e documento do projeto).

## Estrutura
- `server/` API Node.js (Express + mysql2)
- `client/` Interface web com FullCalendar

## Backend
```bash
cd server
cp .env.example .env
# edite o .env conforme seu MySQL
npm init -y
npm install express cors body-parser mysql2 dotenv
# Crie o schema/tabela no MySQL
mysql -u root -p < schema.sql
# Execute
node index.js
```

## Frontend
Abra `client/index.html` em um servidor estático (ou direto no navegador).
Certifique-se que a API está em `http://localhost:3001`.

## Rotas
- GET `/api/events?start=ISO&end=ISO`
- POST `/api/events`
- PUT `/api/events/:id`
- DELETE `/api/events/:id`
