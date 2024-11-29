const db = require('../database/conexion'); // Conexión a la base de datos

class UsuarioModel {
    constructor() {}

    /**
     * Crear un nuevo usuario
     * @param {Object} data - Datos del usuario a crear
     * @returns {Object} - Resultado de la operación (puede incluir el ID generado)
     */
    async crearUsuario(data) {
        try {
            const { nombre, apellido, usuario, password, correo, rol, estado } = data;
            const sql = `
                INSERT INTO usuario 
                (nombre, apellido, usuario, password, correo, rol, fechaCreacion, fechaActualizacion, estado) 
                VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?);
            `;
            const [result] = await db.query(sql, [
                nombre,
                apellido,
                usuario,
                password, // Contraseña ya encriptada
                correo,
                rol,
                estado
            ]);
            return result; // Devuelve el resultado o el ID del nuevo usuario
        } catch (error) {
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    }

    /**
     * Obtener un usuario por su nombre de usuario
     * @param {string} username - Nombre de usuario a buscar
     * @returns {Object|null} - Usuario encontrado o `null` si no existe
     */
    async obtenerUsuarioPorNombre(username) {
        try {
            const sql = `SELECT * FROM usuario WHERE usuario = ?;`;
            const [rows] = await db.query(sql, [username]);
            return rows[0] || null; // Devuelve el primer usuario encontrado o null
        } catch (error) {
            throw new Error('Error al obtener el usuario: ' + error.message);
        }
    }

    /**
     * Validar si un usuario existe
     * @param {string} username - Nombre de usuario a validar
     * @returns {boolean} - `true` si el usuario existe, `false` si no
     */
    async existeUsuario(username) {
        try {
            const usuario = await this.obtenerUsuarioPorNombre(username);
            return !!usuario; // Devuelve true si existe, false si no
        } catch (error) {
            throw new Error('Error al validar si el usuario existe: ' + error.message);
        }
    }
}

module.exports = new UsuarioModel();
