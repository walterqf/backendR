const caso_pruebaModel = require('../models/caso_pruebaModel');// Importar el modelo de proyecto

class CasoPruebaController {
    constructor() {}

    // Consultar todos los proyectos
    async consulta(req, res) {
        try {
            const casos = await caso_pruebaModel.obtenerProyectos();
            res.status(200).json(casos);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // Consultar detalle de un proyecto por ID
    async consultarDetalle(req, res) {
        const { id_caso } = req.params;
        try {
            const caso = await caso_pruebaModel.obtenerProyectoPorId(id_caso);
            if (!caso) {
                return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
            }
            res.status(200).json(caso);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // Ingresar un nuevo proyecto
    async ingresar(req, res) {
        try {
            const nuevoCaso = await caso_pruebaModel.crearProyecto(req.body);
            res.status(201).json({ mensaje: 'Proyecto creado con éxito', id: nuevoCaso.insertId }); // Devuelve el ID del nuevo proyecto
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    // Actualizar un proyecto existente
    async actualizar(req, res) {
        const { id_caso } = req.params;
        try {
            const resultado = await caso_pruebaModel.actualizarProyecto(id_caso, req.body);
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
        const { id_caso } = req.params;
        try {
            const resultado = await caso_pruebaModel.borrarProyecto(id_caso);
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

module.exports = new CasoPruebaController();
