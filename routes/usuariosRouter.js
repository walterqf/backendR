const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/',usuariosController.consulta);
router.post('/',usuariosController.ingresar);

// cuando se consulta por ID
router.route("/:idUsuario")
    .get(usuariosController.consultarDetalle)
    .put(usuariosController.actualizar)
    .delete(usuariosController.borrar);


module.exports = router;