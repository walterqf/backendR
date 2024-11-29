const proyectoModel = require('../models/proyectoModel'); // Importar el modelo de proyecto

class ProyectoController {
    constructor() {}

    // Consultar todos los proyectos
    async consulta(req, res) {
        try {
            const proyectos = await proyectoModel.obtenerProyectos();
            res.status(200).json(proyectos);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // Consultar detalle de un proyecto por ID
    async consultarDetalle(req, res) {
        const { id_proyecto } = req.params;
        try {
            const proyecto = await proyectoModel.obtenerProyectoPorId(id_proyecto);
            if (!proyecto) {
                return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
            }
            res.status(200).json(proyecto);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // Ingresar un nuevo proyecto
    async ingresar(req, res) {
        try {
            const nuevoProyecto = await proyectoModel.crearProyecto(req.body);
            res.status(201).json({ mensaje: 'Proyecto creado con éxito', id: nuevoProyecto.insertId }); // Devuelve el ID del nuevo proyecto
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    // Actualizar un proyecto existente
    async actualizar(req, res) {
        const { id_proyecto } = req.params;
        try {
            const resultado = await proyectoModel.actualizarProyecto(id_proyecto, req.body);
            if (resultado.affectedRows === 1) {
                return res.status(200).json({ mensaje: 'Registro actualizado con éxito' });
            } else {
                return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
            }
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    // Borrar un proyecto
    async borrar(req, res) {
        const { id_proyecto } = req.params;
        try {
            const resultado = await proyectoModel.borrarProyecto(id_proyecto);
            if (resultado.affectedRows === 1) {
                return res.status(200).json({ mensaje: 'Registro eliminado con éxito' });
            } else {
                return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
            }
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

module.exports = new ProyectoController();
