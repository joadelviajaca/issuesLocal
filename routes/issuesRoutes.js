const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');
const issuesController = require('../controllers/issuesController.js');
const { validateFields } = require('../helpers/validate-fields.js');
const { validateJWT } = require('../middleware/validate-jwt.js');
const { hasRole } = require('../middleware/validate-role.js');


// Ruta para obtener todas las incidencias
router.get('/issues', issuesController.getAllIssues);

// Ruta para obtener una incidencia por su ID
router.get('/issues/:id', [
  check('id', 'No es un id correcto').isMongoId(),
  validateFields
], issuesController.getIssueById);

// Ruta para crear una nueva incidencia
router.post('/issues', [
  // validateJWT,
  body('title').notEmpty().withMessage('El título es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  validateFields
], issuesController.createIssue);

// Ruta para actualizar una incidencia existente
router.put('/issues/:id', [
  // validateJWT,
  check('id', 'No es un id correcto').isMongoId(),
  body('title').notEmpty().withMessage('El título es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  body('status').notEmpty().withMessage('El estado es obligatorio'),
  validateFields
], issuesController.updateIssue);

// Ruta para eliminar una incidencia
router.delete('/issues/:id', [
  // validateJWT,
  // hasRole('ADMIN_ROLE'),
  check('id', 'No es un id correcto').isMongoId(),
  validateFields
], issuesController.deleteIssue);

module.exports = router;
