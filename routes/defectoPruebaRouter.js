const express = require('express');
const router = express.Router();
const DefectoController = require('../controllers/defectoPruebaController');

router.get('/',DefectoController.consulta);
router.post('/',DefectoController.ingresar);

// cuando se consulta por ID
router.route("/:id_defecto")
    .get(DefectoController.consultarDetalle)
    .put(DefectoController.actualizar)
    .delete(DefectoController.borrar);


module.exports = router;