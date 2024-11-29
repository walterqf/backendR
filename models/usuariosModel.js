const db = require('../database/conexion'); // Conexión a la base de datos
const bcrypt = require('bcrypt'); // Para encriptación de contraseñas

class UsuariosModel {
    constructor() {}

    // Método para encriptar la contraseña
    async encriptarContraseña(password) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        } catch (error) {
            throw new Error('Error al encriptar la contraseña: ' + error.message);
        }
    }

    // Obtener todos los usuarios
    async obtenerUsuarios() {
        try {
            const [rows] = await db.query(`SELECT * FROM usuario;`);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener los usuarios: ' + error.message);
        }
    }

    // Obtener un usuario por ID
    async obtenerUsuarioPorId(idUsuario) {
        try {
            const [rows] = await db.query(`SELECT * FROM usuario WHERE idUsuario = ?;`, [idUsuario]);
            return rows[0] || null; // Devuelve null si no se encuentra el usuario
        } catch (error) {
            throw new Error('Error al obtener el usuario: ' + error.message);
        }
    }

    // Obtener un usuario por nombre de usuario
    async obtenerUsuarioPorNombre(usuario) {
        try {
            const sql = `SELECT * FROM usuario WHERE usuario = ?;`;
            const [rows] = await db.query(sql, [usuario]);
            return rows[0] || null; // Devuelve null si no se encuentra el usuario
        } catch (error) {
            throw new Error('Error al obtener el usuario por nombre: ' + error.message);
        }
    }

    // Insertar un nuevo usuario
    async crearUsuario(data) {
        try {
            const { nombre, apellido, usuario, password, correo, rol, estado } = data;

            // Encriptar la contraseña antes de guardarla
            const encryptedPassword = await this.encriptarContraseña(password);

            const sql = `
                INSERT INTO usuario 
                (nombre, apellido, usuario, password, correo, rol, fechaCreacion, fechaActualizacion, estado) 
                VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?);
            `;
            const [result] = await db.query(sql, [
                nombre,
                apellido,
                usuario,
                encryptedPassword, // Usar la contraseña encriptada
                correo,
                rol,
                estado
            ]);
            return result; // Devuelve el resultado o el ID del nuevo usuario
        } catch (error) {
            throw new Error('Error al crear el usuario: ' + error.message);
        }
    }

    // Actualizar un usuario
    async actualizarUsuario(idUsuario, data) {
        try {
            const { nombre, apellido, usuario, password, correo, rol, estado } = data;

            // Si se proporciona una nueva contraseña, encriptarla
            const encryptedPassword = password ? await this.encriptarContraseña(password) : password;

            const sql = `
                UPDATE usuario
                SET nombre = ?, apellido = ?, usuario = ?, password = ?, correo = ?, rol = ?, 
                fechaActualizacion = CURRENT_TIMESTAMP, estado = ? 
                WHERE idUsuario = ?;
            `;
            const [result] = await db.query(sql, [
                nombre,
                apellido,
                usuario,
                encryptedPassword,
                correo,
                rol,
                estado,
                idUsuario
            ]);
            return result; // Devuelve el resultado de la consulta
        } catch (error) {
            throw new Error('Error al actualizar el usuario: ' + error.message);
        }
    }

    // Borrar un usuario
    async borrarUsuario(idUsuario) {
        try {
            const sql = `DELETE FROM usuario WHERE idUsuario = ?;`;
            const [result] = await db.query(sql, [idUsuario]);
            return result; // Devuelve el resultado de la consulta
        } catch (error) {
            throw new Error('Error al eliminar el usuario: ' + error.message);
        }
    }
}

module.exports = new UsuariosModel();
