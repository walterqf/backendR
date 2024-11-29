const db = require('../database/conexion');

class DefectoPruebaModel {
    constructor() {}

    // Obtener todos los proyectos
    async obtenerProyectos() {
        try {
            const [rows] = await db.query(`SELECT * FROM defecto_prueba;`);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los defectos: ' + error.message);
        }
    }

    // Obtener un proyecto por ID
    async obtenerProyectoPorId(id_defecto) {
        try {
            const [rows] = await db.query(`SELECT * FROM defecto_prueba WHERE id_defecto = ?;`, [id_defecto]);
            return rows[0] || null; // Devuelve null si no se encuentra el proyecto
        } catch (error) {
            throw new Error('Error al obtener el proyecto: ' + error.message);
        }
    }

    // Insertar un nuevo proyecto
    async crearProyecto(data) {
        try {
            const { nombre,descripcion,id_proyecto,prioridad,
                responsable,estado,fecha_actualizacion,evidencia } = data;
            const sql = `
                INSERT INTO defecto_prueba
                (nombre,descripcion,fecha_registro,id_proyecto,
                prioridad,responsable,estado,fecha_actualizacion,evidencia) 
                VALUES (?, ?,CURRENT_TIMESTAMP, ?,?,?, ?,?, ?);
            `;
            const [result] = await db.query(sql, [nombre,descripcion,id_proyecto,prioridad,
                responsable,estado,fecha_actualizacion,evidencia]);
            return result; // Puedes devolver el resultado o el ID del nuevo proyecto
        } catch (error) {
            throw new Error('Error al crear el defecto: ' + error.message);
        }
    }

    // Actualizar un proyecto
    async actualizarProyecto(id_defecto, data) {
        try {
            const {nombre,descripcion,id_proyecto,prioridad,responsable,estado,evidencia} = data;
            const sql = `
                UPDATE defecto_prueba 
                SET nombre= ?,descripcion= ?,id_proyecto= ?,prioridad= ?,responsable= ?,
                estado= ?,fecha_actualizacion = CURRENT_TIMESTAMP,evidencia= ?
                WHERE id_defecto = ?;
            `;
            const [result] = await db.query(sql, [nombre,descripcion,id_proyecto,
                prioridad,responsable,estado,evidencia, id_defecto]);
            return result; // Devuelve el resultado de la consulta
        } catch (error) {
            throw new Error('Error al actualizar el defecto: ' + error.message);
        }
    }

    // Borrar un proyecto
    async borrarProyecto(id_defecto) {
        try {
            const sql = `DELETE FROM defecto_prueba WHERE id_defecto = ?;`;
            const [result] = await db.query(sql, [id_defecto]);
            return result; // Devuelve el resultado de la consulta
        } catch (error) {
            throw new Error('Error al eliminar el defecto: ' + error.message);
        }
    }
}

module.exports = new DefectoPruebaModel();
