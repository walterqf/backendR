const express = require('express');
const router = express.Router();
const CasoPruebaController = require('../controllers/caso_pruebaController');

router.get('/',CasoPruebaController.consulta);
router.post('/',CasoPruebaController.ingresar);

// cuando se consulta por ID
router.route("/:id_caso")
    .get(CasoPruebaController.consultarDetalle)
    .put(CasoPruebaController.actualizar)
    .delete(CasoPruebaController.borrar);


module.exports = router;