const express = require('express');
const cors = require('cors');
const app = express();
// Morgan es un middleware para registrar solicitudes HTTP
const morgan = require('morgan');

// Importar rutas
const proyectoRouter = require('./routes/proyectoRouter');
const planPruebaRouter = require('./routes/planPruebaRouter');
const casoPruebaRouter = require('./routes/caso_pruebaRouter');
const escenarioPruebaRouter = require('./routes/escenarioPruebaRouter');
const usuarioRouter = require('./routes/usuarioRouter');
const usuariosRouter = require('./routes/usuariosRouter');
const defectoRouter = require('./routes/defectoPruebaRouter');
const ejecucionPruebaRouter = require('./routes/ejecucionPruebaRouter');
//token
const auth = require('./middleware/auth');

// Middlewares globales
app.use(express.json()); // Permitir el manejo de JSON
app.use(morgan('dev'));
app.use(cors()); // Habilitar CORS para evitar problemas de seguridad al comunicar con el frontend

// Configuración de rutas
app.use('/proyecto', proyectoRouter); // Rutas relacionadas con proyectos
app.use('/plan', planPruebaRouter); // Rutas relacionadas con planes de prueba
app.use('/caso', casoPruebaRouter); // Rutas relacionadas con casos de prueba
app.use('/escenario', escenarioPruebaRouter); // Rutas relacionadas con escenarios de prueba

app.use('/escenario', escenarioPruebaRouter); // Rutas relacionadas con escenarios de prueba
app.use('/usuario', usuarioRouter); // Todas las rutas de usuario gestionadas desde usuarioRouter
app.use('/defecto', defectoRouter); // Todas las rutas de defectos

// Rutas de autenticación y gestión de usuarios
app.use('/usuarios', usuariosRouter); // Todas las rutas de usuario gestionadas desde usuariosRouter

// Rutas para la ejecución de pruebas
app.use("/ejecucion",ejecucionPruebaRouter);

// Puerto en el que se ejecuta el servidor
const PORT = 5800;
app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
