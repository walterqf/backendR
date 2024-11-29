const db = require('../database/conexion');

class EscenarioPruebaModel {
    constructor() {}

    // Obtener todos los proyectos
    async obtenerProyectos() {
        try {
            const [rows] = await db.query(`SELECT * FROM escenario_prueba;`);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los proyectos: ' + error.message);
        }
    }

    // Obtener un proyecto por ID
    async obtenerProyectoPorId(id_escenario) {
        try {
            const [rows] = await db.query(`SELECT * FROM escenario_prueba WHERE id_escenario = ?;`, [id_escenario]);
            return rows[0] || null; // Devuelve null si no se encuentra el proyecto
        } catch (error) {
            throw new Error('Error al obtener el proyecto: ' + error.message);
        }
    }

    // Insertar un nuevo proyecto
    async crearProyecto(data) {
        try {
            const { id_plan_prueba, nombre, descripcion } = data;
            const sql = `
                INSERT INTO escenario_prueba 
                (id_plan_prueba, nombre, descripcion) 
                VALUES (?, ?, ?);
            `;
            const [result] = await db.query(sql, [id_plan_prueba, nombre, descripcion]);
            return result; // Puedes devolver el resultado o el ID del nuevo proyecto
        } catch (error) {
            throw new Error('Error al crear el proyecto: ' + error.message);
        }
    }

    // Actualizar un proyecto
    async actualizarProyecto(id_escenario, data) {
        try {
            const { id_plan_prueba, nombre, descripcion} = data;
            const sql = `
                UPDATE escenario_prueba 
                SET id_plan_prueba = ?, nombre = ?, descripcion = ?
                WHERE id_escenario = ?;
            `;
            const [result] = await db.query(sql, [id_plan_prueba, nombre, descripcion, id_escenario]);
            return result; // Devuelve el resultado de la consulta
        } catch (error) {
            throw new Error('Error al actualizar el proyecto: ' + error.message);
        }
    }

    // Borrar un proyecto
    async borrarProyecto(id_escenario) {
        try {
            const sql = `DELETE FROM escenario_prueba WHERE id_escenario = ?;`;
            const [result] = await db.query(sql, [id_escenario]);
            return result; // Devuelve el resultado de la consulta
        } catch (error) {
            throw new Error('Error al eliminar el proyecto: ' + error.message);
        }
    }
}

module.exports = new EscenarioPruebaModel();
