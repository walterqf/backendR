const db = require('../database/conexion');

class PlanPruebaModel {
    constructor() {}

 // Obtener todos los proyectos
async obtenerProyectos() {
    try {
        const sql = `
        SELECT 
        pp.*, 
        CONCAT(u.nombre,' ',u.apellido) AS responsable_nombre 
        FROM 
             planes_prueba pp
            LEFT JOIN 
            usuario u 
                ON 
                pp.id_responsable = u.idUsuario;

        `;
        const [rows] = await db.query(sql);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener los planes: ' + error.message);
    }
}


    // Obtener un proyecto por ID
    async obtenerProyectoPorId(id_plan) {
        try {
            const [rows] = await db.query(`SELECT * FROM planes_prueba WHERE id_plan = ?;`, [id_plan]);
            return rows[0] || null; // Devuelve null si no se encuentra el proyecto
        } catch (error) {
            throw new Error('Error al obtener el plan: ' + error.message);
        }
    }

    // Insertar un nuevo plan
    async crearProyecto(data) {
        try {
            const { id_proyecto,nombre,descripcion,id_responsable, fecha_ejecucion,estado } = data;
            const sql = `
                INSERT INTO planes_prueba 
                (id_proyecto,nombre,descripcion,id_responsable,fecha_creacion, fecha_ejecucion,estado) 
                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?);
            `;
            const [result] = await db.query(sql, [id_proyecto,nombre,descripcion,id_responsable, fecha_ejecucion,estado]);
            return result; // Puedes devolver el resultado o el ID del nuevo proyecto
        } catch (error) {
            throw new Error('Error al crear el proyecto: ' + error.message);
        }
    }

    // Actualizar un plan por medio del ID
    async actualizarProyecto(id_plan, data) {
        try {
            const { id_proyecto, nombre, descripcion, id_responsable, fecha_ejecucion, estado } = data;
            const sql = `
                UPDATE planes_prueba 
                SET id_proyecto = ?, nombre = ?, descripcion = ?, id_responsable = ?, fecha_ejecucion = ?, estado = ?
                WHERE id_plan = ?;
            `;
            const [result] = await db.query(sql, [id_proyecto, nombre, descripcion, id_responsable, fecha_ejecucion, estado, id_plan]);
            return result;
        } catch (error) {
            throw new Error('Error al actualizar el proyecto: ' + error.message);
        }
    }
    

    // Borrar un proyecto
    async borrarProyecto(id_proyecto) {
        try {
            const sql = `DELETE FROM planes_prueba WHERE id_plan = ?;`;
            const [result] = await db.query(sql, [id_proyecto]);
            return result; // Devuelve el resultado de la consulta
        } catch (error) {
            throw new Error('Error al eliminar el proyecto: ' + error.message);
        }
    }
}

module.exports = new PlanPruebaModel();
