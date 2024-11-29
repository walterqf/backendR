const express = require('express');
const router = express.Router();
const escenarioPruebaController = require('../controllers/escenarioPruebaController');

router.get('/',escenarioPruebaController.consulta);
router.post('/',escenarioPruebaController.ingresar);

// cuando se consulta por ID
router.route("/:id_escenario")
    .get(escenarioPruebaController.consultarDetalle)
    .put(escenarioPruebaController.actualizar)
    .delete(escenarioPruebaController.borrar);


module.exports = router;