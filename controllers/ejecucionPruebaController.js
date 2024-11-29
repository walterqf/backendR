const fs = require("fs");
const axios = require("axios");

const ejecucionPruebaModel = require("../models/ejecucionPruebaModel");

const ejecutarPrueba = async (req, res) => {
  try {
    // Verifica si el archivo fue subido
    if (!req.file) {
      return res.status(400).json({ exito: false, error: "Archivo no proporcionado." });
    }

    // Verifica si `id_caso` está presente
    const { id_caso } = req.body;
    if (!id_caso) {
      return res.status(400).json({ exito: false, error: "ID del caso de prueba no proporcionado." });
    }

    let datos;
    try {
      // Lee el contenido del archivo y parsea JSON
      const contenido = fs.readFileSync(req.file.path, "utf-8");
      datos = JSON.parse(contenido);
    } catch (error) {
      // Maneja errores de parseo
      const resultadoError = {
        id_caso,
        url: null,
        exito: false,
        error: "El archivo JSON está mal formado.",
      };
      await ejecucionPruebaModel.guardarResultadoPrueba(resultadoError);
      return res.status(400).json(resultadoError);
    }

    const resultados = [];

    // Verifica si el archivo tiene la estructura esperada
    if (!datos.pruebas || !Array.isArray(datos.pruebas)) {
      const errorResultado = {
        id_caso,
        url: null,
        exito: false,
        error: "Archivo no tiene el formato esperado.",
      };
      await ejecucionPruebaModel.guardarResultadoPrueba(errorResultado);
      return res.status(400).json(errorResultado);
    }

    // Itera sobre las pruebas (URLs) y realiza la petición
    for (const prueba of datos.pruebas) {
      try {
        const startTime = Date.now();
        const respuesta = await axios.get(prueba.url);
        const endTime = Date.now();

        const resultado = {
          id_caso,
          url: prueba.url,
          status: respuesta.status,
          tiempo: endTime - startTime, // Tiempo en milisegundos
          exito: true,
          datos: respuesta.data,
        };

        await ejecucionPruebaModel.guardarResultadoPrueba(resultado);
        resultados.push(resultado);
      } catch (error) {
        const resultadoError = {
          id_caso,
          url: prueba.url,
          error: error.message,
          exito: false,
        };

        await ejecucionPruebaModel.guardarResultadoPrueba(resultadoError);
        resultados.push(resultadoError);
      }
    }

    // Devuelve los resultados al cliente
    res.json({ exito: true, resultados });
  } catch (error) {
    console.error(error);

    // Inserta un error genérico si algo falla en el proceso completo
    const resultadoErrorGeneral = {
      id_caso: req.body.id_caso || null,
      url: null,
      exito: false,
      error: "Error al ejecutar la prueba.",
    };
    await ejecucionPruebaModel.guardarResultadoPrueba(resultadoErrorGeneral);

    res.status(500).json(resultadoErrorGeneral);
  }
};

module.exports = { ejecutarPrueba };
