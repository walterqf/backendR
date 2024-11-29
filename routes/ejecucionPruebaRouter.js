const express = require("express");
const multer = require("multer");
const { ejecutarPrueba } = require("../controllers/ejecucionPruebaController");
const ejecucionPruebaModel = require("../models/ejecucionPruebaModel");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Carpeta temporal para subir archivos

// Ruta para subir el archivo y luego ejecutar las pruebas
router.post('/subir-y-ejecutar', upload.single('archivo'), ejecutarPrueba);

// (Opcional) Ruta para obtener el historial de resultados
router.get('/historial', async (req, res) => {
  try {
    const historial = await ejecucionPruebaModel.obtenerResultadosPruebas();
    res.json({ exito: true, historial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ exito: false, error: "Error al obtener el historial de pruebas." });
  }
});

module.exports = router;
