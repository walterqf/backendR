const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para registrar usuario
router.post('/registrar', usuarioController.ingresarUsuario);

// Ruta para autenticar usuario
router.post('/iniciar-sesion', usuarioController.autenticarUsuario);

module.exports = router;
