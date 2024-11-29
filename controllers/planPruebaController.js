const planPruebaModel = require('../models/planPruebaModel');// Importar el modelo de proyecto

class PlanPruebaController {
    constructor() {}

    // Consultar todos los proyectos
    async consulta(req, res) {
        try {
            const planes = await planPruebaModel.obtenerProyectos();
            res.status(200).json(planes);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // Consultar detalle de un proyecto por ID
    async consultarDetalle(req, res) {
        const { id_plan } = req.params;
        try {
            const proyecto = await planPruebaModel.obtenerProyectoPorId(id_plan);
            if (!proyecto) {
                return res.status(404).json({ mensaje: 'Plan no encontrado' });
            }
            res.status(200).json(proyecto);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // Ingresar un nuevo proyecto
    async ingresar(req, res) {
        try {
            const nuevoProyecto = await planPruebaModel.crearProyecto(req.body);
            res.status(201).json({ mensaje: 'Proyecto creado con éxito', id: nuevoProyecto.insertId }); // Devuelve el ID del nuevo proyecto
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    // Actualizar un proyecto existente
    async actualizar(req, res) {
        const { id_plan } = req.params;
        try {
            const resultado = await planPruebaModel.actualizarProyecto(id_plan, req.body);
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
        const { id_plan } = req.params;
        try {
            const resultado = await planPruebaModel.borrarProyecto(id_plan);
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

module.exports = new PlanPruebaController();
