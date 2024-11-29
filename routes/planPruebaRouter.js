const express = require('express');
const router = express.Router();
const planPruebaController = require('../controllers/planPruebaController');

router.get('/',planPruebaController.consulta);
router.post('/',planPruebaController.ingresar);

// cuando se consulta por ID
router.route("/:id_plan")
    .get(planPruebaController.consultarDetalle)
    .put(planPruebaController.actualizar)
    .delete(planPruebaController.borrar);


module.exports = router;