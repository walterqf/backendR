const db = require('../database/conexion');

class ProyectoModel {
    constructor() {}

    // Obtener todos los proyectos
    async obtenerProyectos() {
        try {
            const [rows] = await db.query(`SELECT * FROM proyecto;`);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los proyectos: ' + error.message);
        }
    }

    // Obtener un proyecto por ID
    async obtenerProyectoPorId(id_proyecto) {
        try {
            const [rows] = await db.query(`SELECT * FROM proyecto WHERE id_proyecto = ?;`, [id_proyecto]);
            return rows[0] || null; // Devuelve null si no se encuentra el proyecto
        } catch (error) {
            throw new Error('Error al obtener el proyecto: ' + error.message);
        }
    }

    // Insertar un nuevo proyecto
    async crearProyecto(data) {
        try {
            const { nombre, descripcion, fecha_inicio, fecha_fin_estimada, estado, recursos, presupuesto_estimado } = data;
            const sql = `
                INSERT INTO proyecto 
                (nombre, descripcion, fecha_inicio, fecha_fin_estimada, estado, recursos, presupuesto_estimado, fecha_creacion, ultima_actualizacion) 
                VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
            `;
            const [result] = await db.query(sql, [nombre, descripcion, fecha_inicio, fecha_fin_estimada, estado, recursos, presupuesto_estimado]);
            return result; // Puedes devolver el resultado o el ID del nuevo proyecto
        } catch (error) {
            throw new Error('Error al crear el proyecto: ' + error.message);
        }
    }

    // Actualizar un proyecto
    async actualizarProyecto(id_proyecto, data) {
        try {
            const { nombre, descripcion, fecha_inicio, fecha_fin_estimada, estado, recursos, presupuesto_estimado } = data;
            const sql = `
                UPDATE proyecto 
                SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin_estimada = ?, 
                    estado = ?, recursos = ?, presupuesto_estimado = ?, 
                    ultima_actualizacion = CURRENT_TIMESTAMP 
                WHERE id_proyecto = ?;
            `;
            const [result] = await db.query(sql, [nombre, descripcion, fecha_inicio, fecha_fin_estimada, estado, recursos, presupuesto_estimado, id_proyecto]);
            return result; // Devuelve el resultado de la consulta
        } catch (error) {
            throw new Error('Error al actualizar el proyecto: ' + error.message);
        }
    }

    // Borrar un proyecto
    async borrarProyecto(id_proyecto) {
        try {
            const sql = `DELETE FROM proyecto WHERE id_proyecto = ?;`;
            const [result] = await db.query(sql, [id_proyecto]);
            return result; // Devuelve el resultado de la consulta
        } catch (error) {
            throw new Error('Error al eliminar el proyecto: ' + error.message);
        }
    }
}

module.exports = new ProyectoModel();
