const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

router.get('/',proyectoController.consulta);
router.post('/',proyectoController.ingresar);

// cuando se consulta por ID
router.route("/:id_proyecto")
    .get(proyectoController.consultarDetalle)
    .put(proyectoController.actualizar)
    .delete(proyectoController.borrar);


module.exports = router;