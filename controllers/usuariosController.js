const bcrypt = require('bcrypt'); // Para encriptación de contraseñas
const UsuariosModel = require('../models/usuariosModel'); // Importar el modelo de usuario

class UsuariosController {
    constructor() {}

    // Consultar todos los usuarios
    async consulta(req, res) {
        try {
            const usuarios = await UsuariosModel.obtenerUsuarios(); // Obtener todos los usuarios
            res.status(200).json(usuarios); // Enviar los usuarios en respuesta
        } catch (err) {
            res.status(500).send(err.message); // En caso de error, enviamos un mensaje de error
        }
    }

    // Consultar detalle de un usuario por ID
    async consultarDetalle(req, res) {
        const { idUsuario } = req.params; // Obtenemos el ID del usuario desde los parámetros de la URL
        try {
            const usuario = await UsuariosModel.obtenerUsuarioPorId(idUsuario); // Obtener usuario por ID
            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' }); // Si no existe el usuario, devolver un error
            }
            res.status(200).json(usuario); // Devolver el usuario encontrado
        } catch (err) {
            res.status(500).send(err.message); // En caso de error, enviar el mensaje de error
        }
    }

    // Ingresar un nuevo usuario
    async ingresar(req, res) {
        try {
            const { nombre, apellido, usuario, password, correo, rol, estado } = req.body;

            // Validación básica
            if (!nombre || !apellido || !usuario || !password || !correo || !rol || !estado) {
                return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
            }

            // Verificar si el usuario ya existe
            const existe = await UsuariosModel.obtenerUsuarioPorNombre(usuario);
            if (existe) {
                return res.status(400).json({ mensaje: 'El usuario ya existe' });
            }

            // Encriptar la contraseña
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Crear el usuario
            const nuevoUsuario = await UsuariosModel.crearUsuario({
                nombre,
                apellido,
                usuario,
                password: hashedPassword,
                correo,
                rol,
                estado
            });

            res.status(201).json({ mensaje: 'Usuario creado con éxito', id: nuevoUsuario.insertId });
        } catch (err) {
            res.status(500).json({ mensaje: 'Error al registrar el usuario', error: err.message });
        }
    }

    // Actualizar un usuario existente
    async actualizar(req, res) {
        const { idUsuario } = req.params; // Obtener el ID del usuario desde los parámetros de la URL
        try {
            const resultado = await UsuariosModel.actualizarUsuario(idUsuario, req.body); // Actualizar usuario en la base de datos
            if (resultado.affectedRows === 1) {
                return res.status(200).json({ mensaje: 'Usuario actualizado con éxito' });
            } else {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
        } catch (err) {
            res.status(400).send(err.message); // En caso de error, devolvemos el mensaje de error
        }
    }

    // Borrar un usuario
    async borrar(req, res) {
        const { idUsuario } = req.params; // Obtener el ID del usuario desde los parámetros de la URL
        try {
            const resultado = await UsuariosModel.borrarUsuario(idUsuario); // Borrar usuario de la base de datos
            if (resultado.affectedRows === 1) {
                return res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
            } else {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
        } catch (err) {
            res.status(400).send(err.message); // En caso de error, devolvemos el mensaje de error
        }
    }
}

module.exports = new UsuariosController();
