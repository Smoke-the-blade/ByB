import * as empleadosService from "../services/empleadosServices.js";

export const getEmpleados = async (req, res) => {
    try {
        const empleados = await empleadosService.getAll();
        res.json(empleados);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getEmpleadoById = async (req, res) => {
    try {
        const empleado = await empleadosService.getById(req.params.id);

        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        res.json(empleado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createEmpleado = async (req, res) => {
    try {
        const data = req.body;

        if (!data.nombre) {
            return res.status(400).json({ message: "El nombre es obligatorio" });
        }

        const result = await empleadosService.create(data);

        res.json({
            message: "Empleado creado",
            id: result.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateEmpleado = async (req, res) => {
    try {
        const result = await empleadosService.update(req.params.id, req.body);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        res.json({ message: "Empleado actualizado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteEmpleado = async (req, res) => {
    try {
        const result = await empleadosService.remove(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        res.json({ message: "Empleado eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};