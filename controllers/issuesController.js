const { validationResult } = require('express-validator');
const Issue = require('../models/Issue');

// Controlador para obtener todas las incidencias
exports.getAllIssues = (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  
  Issue.find(filter)
    .then(issues => {
      const total = issues.length;
      res.json({ total, issues });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al obtener las incidencias' });
    });
};

// Controlador para obtener una incidencia por su ID
exports.getIssueById = (req, res) => {
  const id = req.params.id;
  Issue.findById(id)
    .then(issue => {
      if (issue) {
        res.json({ issue });
      } else {
        res.status(404).json({ error: 'Incidencia no encontrada' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al obtener la incidencia' });
    });
};

// Controlador para crear una nueva incidencia
exports.createIssue = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description } = req.body;
  const newIssue = new Issue({ title, description });
  newIssue.save()
    .then(savedIssue => {
      res.status(201).json(savedIssue);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al crear la incidencia' });
    });
};

// Controlador para actualizar una incidencia existente
exports.updateIssue = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id;
  const { title, description, status } = req.body;
  Issue.findByIdAndUpdate(id, { title, description, status }, { new: true })
    .then(updatedIssue => {
      if (updatedIssue) {
        res.json(updatedIssue);
      } else {
        res.status(404).json({ error: 'Incidencia no encontrada' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al actualizar la incidencia' });
    });
};

// Controlador para eliminar una incidencia
exports.deleteIssue = (req, res) => {
  const id = req.params.id;
  Issue.findByIdAndDelete(id)
    .then(deletedIssue => {
      if (deletedIssue) {
        res.json(deletedIssue);
      } else {
        res.status(404).json({ error: 'Incidencia no encontrada' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Error al eliminar la incidencia' });
    });
};
