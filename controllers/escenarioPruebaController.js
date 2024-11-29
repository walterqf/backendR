const escenarioPruebaModel = require('../models/escenarioPruebaModel');// Importar el modelo de proyecto

class EscenarioPruebaController {
    constructor() {}

    // Consultar todos los proyectos
    async consulta(req, res) {
        try {
            const casos = await escenarioPruebaModel.obtenerProyectos();
            res.status(200).json(casos);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // Consultar detalle de un proyecto por ID
    async consultarDetalle(req, res) {
        const { id_escenario } = req.params;
        try {
            const caso = await escenarioPruebaModel.obtenerProyectoPorId(id_escenario);
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
            const nuevoCaso = await escenarioPruebaModel.crearProyecto(req.body);
            res.status(201).json({ mensaje: 'Proyecto creado con éxito', id: nuevoCaso.insertId }); // Devuelve el ID del nuevo proyecto
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    // Actualizar un proyecto existente
    async actualizar(req, res) {
        const { id_escenario } = req.params;
        try {
            const resultado = await escenarioPruebaModel.actualizarProyecto(id_escenario, req.body);
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
        const { id_escenario } = req.params;
        try {
            const resultado = await escenarioPruebaModel.borrarProyecto(id_escenario);
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

module.exports = new EscenarioPruebaController();
