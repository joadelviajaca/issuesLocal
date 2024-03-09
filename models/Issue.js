const mongoose = require('mongoose');

// Definición del esquema de incidencia
const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'abierta' }
});

module.exports = mongoose.model('Issue', issueSchema);
