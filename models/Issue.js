const mongoose = require('mongoose');

// Definición del esquema de incidencia
const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'abierta' }
});

issueSchema.methods.toJSON = function() {
  const { __v, _id, ...issue  } = this.toObject();
  issue.id = _id;
  return issue;
}

module.exports = mongoose.model('Issue', issueSchema);
