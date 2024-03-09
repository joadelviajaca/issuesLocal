const mongoose = require('mongoose');
const Issue = require('../models/Issue');
const User = require('../models/user');

const seedDatabase = async () => {
  try {
    // Conectar a la base de datos
   

    // Datos de ejemplo para las incidencias
    const issuesData = [{
        "title": "Incidencia 1",
        "description": "Descripción de la incidencia 1",
        "status": "cerrada",
        "__v": 0
      },
      {
        "title": "Incidencia 2",
        "description": "Descripción de la inciencia 2",
        "status": "abierta",
        "__v": 0
      },
      {
        "title": "Incidencia 3 ",
        "description": "Descripción de la incidencia 3",
        "status": "en proceso",
        "__v": 0
      },
      {
        "title": "Incidencia 4",
        "description": "Descripción de la incidencia 4",
        "status": "abierta",
        "__v": 0
      },
      {
        "title": "Incidencia 5",
        "description": "Descripción de la incidencia 5",
        "status": "cerrada",
        "__v": 0
      },
      {
        "title": "Incidencia 6",
        "description": "Descripción de la incidencia 6",
        "status": "en proceso",
        "__v": 0
      }];

    // Insertar datos de ejemplo de incidencias
    await Issue.insertMany(issuesData);

    // Datos de ejemplo para usuarios
    const usersData = [{
        "name": "Juan Pérez",
        "email": "juan@example.com",
        "login": "juanperez",
        "password": "$2a$10$2MlFcKzaRrCrjFJBesUOoeVq/jU/4zafA1VIrGsrPvVxwqEqWb1aa",
        "role": "USER_ROLE",
        "state": true,
        "__v": 0
      },
      {
        "name": "María García",
        "email": "maria@example.com",
        "login": "mariag",
        "password": "$2a$10$yR6hsTOVCYwr81X0pi1L8OXkhkSp7wvYMJILSKAFPjJq4NougTLAu",
        "role": "ADMIN_ROLE",
        "state": true,
        "__v": 0
      },
      {
        "name": "Carlos Ruiz",
        "email": "carlos@example.com",
        "login": "carlosr",
        "password": "$2a$10$OvCdwdxvHi.yhhkHANZiwODKgQeoSNqNwWugyTn4Wl8cR9MHfEGEu",
        "role": "USER_ROLE",
        "state": true,
        "__v": 0
      },
      {
        "name": "Ana Martínez",
        "email": "ana@example.com",
        "login": "anam",
        "password": "$2a$10$BBYtW8R8m7zpqaVAEiLF/ed1yJkoYalrK422tuxttrKGeaC532qAK",
        "role": "USER_ROLE",
        "state": true,
        "__v": 0
      },
      {
        "name": "Pedro López",
        "email": "pedro@example.com",
        "login": "pedrol",
        "password": "$2a$10$aseeI38w4NC7Dyx3GhQE8Ovt45ElzMQoQv6Nf6i9pJcFSK1.sN6ie",
        "role": "USER_ROLE",
        "state": false,
        "__v": 0
      },
      {
        "name": "Laura Sánchez",
        "email": "laura@example.com",
        "login": "lauras",
        "password": "$2a$10$cj9AU0QMES3m5ZDO2NOiZe1SLBG81zVaFFheu6uSdR47olGqSrbIi",
        "role": "ADMIN_ROLE",
        "state": true,
        "__v": 0
      }];

    // Insertar datos de ejemplo de usuarios
    await User.insertMany(usersData);

    console.log('Datos de ejemplo insertados correctamente');
  } catch (error) {
    console.error('Error al insertar datos de ejemplo:', error);
  } 
};
module.exports = {
    seedDatabase
}
// Ejecutar la función para insertar datos de ejemplo
// seedDatabase();