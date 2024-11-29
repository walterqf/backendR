const DefectoPrueba = require('../models/defecto_pruebaModel');// Importar el modelo de proyecto

class DefectoController {
    constructor() {}

    // Consultar todos los proyectos
    async consulta(req, res) {
        try {
            const defectos = await DefectoPrueba.obtenerProyectos();
            res.status(200).json(defectos);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // Consultar detalle de un proyecto por ID
    async consultarDetalle(req, res) {
        const { id_defecto } = req.params;
        try {
            const defectos = await DefectoPrueba.obtenerProyectoPorId(id_defecto);
            if (!defectos) {
                return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
            }
            res.status(200).json(defectos);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    // Ingresar un nuevo proyecto
    async ingresar(req, res) {
        try {
            const nuevodefectos = await DefectoPrueba.crearProyecto(req.body);
            res.status(201).json({ mensaje: 'Proyecto creado con éxito', id: nuevodefectos.insertId }); // Devuelve el ID del nuevo proyecto
        } catch (err) {
            res.status(400).send(err.message);
        }
    }

    // Actualizar un proyecto existente
    async actualizar(req, res) {
        const { id_defecto } = req.params;
        try {
            const resultado = await DefectoPrueba.actualizarProyecto(id_defecto, req.body);
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
        const { id_defecto } = req.params;
        try {
            const resultado = await DefectoPrueba.borrarProyecto(id_defecto);
            if (resultado.affectedRows === 1) {
                return res.status(200).json({ mensaje: 'Registro eliminado con éxito' });
            } else {
                return res.status(404).json({ mensaje: 'Defecto no encontrado' });
            }
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

module.exports = new DefectoController();
