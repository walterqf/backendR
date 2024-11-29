const db = require('../database/conexion');

class CasoPruebaModel {
    constructor() {}

    // Obtener todos los proyectos
    async obtenerProyectos() {
        try {
            const [rows] = await db.query(`SELECT * FROM caso_prueba;`);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los proyectos: ' + error.message);
        }
    }

    // Obtener un proyecto por ID
    async obtenerProyectoPorId(id_caso) {
        try {
            const [rows] = await db.query(`SELECT * FROM caso_prueba WHERE id_caso = ?;`, [id_caso]);
            return rows[0] || null; // Devuelve null si no se encuentra el proyecto
        } catch (error) {
            throw new Error('Error al obtener el proyecto: ' + error.message);
        }
    }

    // Insertar un nuevo proyecto
    async crearProyecto(data) {
        try {
            const { id_escenario, descripcion,criterios_aceptacion } = data;
            const sql = `
                INSERT INTO caso_prueba 
                (id_escenario, descripcion,criterios_aceptacion) 
                VALUES (?, ?, ?);
            `;
            const [result] = await db.query(sql, [id_escenario, descripcion,criterios_aceptacion]);
            return result; // Puedes devolver el resultado o el ID del nuevo proyecto
        } catch (error) {
            throw new Error('Error al crear el proyecto: ' + error.message);
        }
    }

    // Actualizar un proyecto
    async actualizarProyecto(id_caso, data) {
        try {
            const { id_escenario, descripcion,criterios_aceptacion} = data;
            const sql = `
                UPDATE caso_prueba 
                SET id_escenario = ?, descripcion = ?,criterios_aceptacion = ?
                WHERE id_caso = ?;
            `;
            const [result] = await db.query(sql, [id_escenario, descripcion,criterios_aceptacion, id_caso]);
            return result; // Devuelve el resultado de la consulta
        } catch (error) {
            throw new Error('Error al actualizar el proyecto: ' + error.message);
        }
    }

    // Borrar un proyecto
    async borrarProyecto(id_caso) {
        try {
            const sql = `DELETE FROM caso_prueba WHERE id_caso = ?;`;
            const [result] = await db.query(sql, [id_caso]);
            return result; // Devuelve el resultado de la consulta
        } catch (error) {
            throw new Error('Error al eliminar el proyecto: ' + error.message);
        }
    }
}

module.exports = new CasoPruebaModel();
