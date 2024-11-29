const jwt = require('jsonwebtoken'); // Para manejo de JSON Web Tokens
const bcrypt = require('bcrypt'); // Para encriptación de contraseñas
const Usuarios = require('../models/usuarioModel'); // Importar el modelo de usuario

class UsuarioController {
    constructor() {}

    /**
     * Registrar un nuevo usuario
     */
    async ingresarUsuario(req, res) {
        try {
            const { nombre, apellido, usuario, password, correo, rol, estado } = req.body;

            // Verificar si el usuario ya existe
            const existe = await Usuarios.existeUsuario(usuario);
            if (existe) {
                return res.status(400).json({ mensaje: 'El usuario ya existe' });
            }

            // Encriptar la contraseña usando bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Crear el usuario con la contraseña encriptada
            const nuevoUsuario = await Usuarios.crearUsuario({
                nombre,
                apellido,
                usuario,
                password: hashedPassword,
                correo,
                rol,
                estado
            });

            // Generar un token JWT para el nuevo usuario
            const token = jwt.sign(
                { id: nuevoUsuario.insertId, usuario },
                process.env.JWT_SECRET || 'secret_key',
                { expiresIn: '1h' }
            );

            res.status(201).json({ mensaje: 'Usuario creado con éxito', token });
        } catch (err) {
            res.status(500).json({ mensaje: 'Error al registrar el usuario', error: err.message });
        }
    }

    /**
     * Autenticar un usuario
     */
    async autenticarUsuario(req, res) {
        try {
            const { usuario, password } = req.body;

            // Buscar el usuario por nombre
            const usuarioDB = await Usuarios.obtenerUsuarioPorNombre(usuario);
            if (!usuarioDB) {
                return res.status(400).json({ mensaje: 'Usuario no encontrado' });
            }

            // Comparar la contraseña ingresada con la almacenada
            const esValida = await bcrypt.compare(password, usuarioDB.password);
            if (!esValida) {
                return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
            }

            // Generar un token JWT si las credenciales son válidas
            const token = jwt.sign(
                { id: usuarioDB.id, usuario: usuarioDB.usuario, rol: usuarioDB.rol },
                process.env.JWT_SECRET || 'secret_key',
                { expiresIn: '1h' }
            );


            res.status(200).json({ mensaje: 'Autenticación exitosa', token, rol: usuarioDB.rol });
        } catch (err) {
            res.status(500).json({ mensaje: 'Error al autenticar el usuario', error: err.message });
        }
    }
}

module.exports = new UsuarioController();
