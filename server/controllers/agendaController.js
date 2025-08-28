const model = require('../models/eventModel');

function badRequest(res, msg) {
  return res.status(400).json({ error: msg });
}

exports.getEvents = async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) return badRequest(res, 'Parâmetros start e end são obrigatórios (ISO).');
    const rows = await model.listEvents({ start, end });
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao listar eventos' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, start, end } = req.body;
    if (!title || !start || !end) return badRequest(res, 'title, start e end são obrigatórios.');
    if (new Date(end) <= new Date(start)) return badRequest(res, 'end deve ser após start.');

    const created = await model.createEvent(req.body);
    res.status(201).json(created);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao criar evento' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updated = await model.updateEvent(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Evento não encontrado' });
    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao atualizar evento' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const ok = await model.deleteEvent(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Evento não encontrado' });
    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao excluir evento' });
  }
};
