const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {seedDatabase} = require('./helpers/seed');

const app = express();

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Habilitar CORS
app.use(cors());

const mongoServer = new MongoMemoryServer();
const initDB = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  mongoose.connect(uri)
    .then(() => {
      console.log('Conexión a MongoDB exitosa');
    })
    .catch(error => {
      console.error('Error al conectar a MongoDB:', error);
    });

}
initDB();
// Configuración de variables de entorno
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB Atlas
seedDatabase();

// Importar las rutas
const issuesRoutes = require('./routes/issuesRoutes');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// Usar las rutas importadas como middleware
app.use('/api', issuesRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);

// Manejador de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
