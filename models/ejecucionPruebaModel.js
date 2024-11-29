const db = require("../database/conexion"); // Tu conexión a la base de datos

class EjecucionPruebaModel {
  constructor() {}

  // Guardar el resultado de una prueba
  async guardarResultadoPrueba(resultado) {
    try {
      const query = `
        INSERT INTO resultados_pruebas (id_caso, url, status, tiempo, exito, error, datos) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const valores = [
        resultado.id_caso || null, // ID del caso de prueba
        resultado.url || null, // URL de la prueba
        resultado.status || null, // Código de estado HTTP
        resultado.tiempo || null, // Tiempo de respuesta
        resultado.exito || false, // Éxito de la prueba (true/false)
        resultado.error || null, // Mensaje de error si ocurrió
        JSON.stringify(resultado.datos) || null, // Datos de respuesta
      ];

      await db.execute(query, valores);
    } catch (error) {
      console.error("Error al guardar el resultado de la prueba:", error.message);
      throw new Error("Error al guardar el resultado en la base de datos.");
    }
  }

  // Opcional: Obtener resultados de pruebas anteriores
  async obtenerResultadosPruebas() {
    try {
      const [rows] = await db.query(
        `SELECT * FROM resultados_pruebas ORDER BY creado_en ASC;`
      );
      return rows;
    } catch (error) {
      console.error("Error al obtener los resultados de pruebas:", error.message);
      throw new Error("Error al obtener los resultados de pruebas.");
    }
  }
}

module.exports = new EjecucionPruebaModel();
