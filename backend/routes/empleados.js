import express from "express";
import db from "../db.js";

const router = express.Router();

// Obtener todos los empleados
router.get("/", (req, res) => {
    db.query("SELECT * FROM empleados", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Obtener un empleado por ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM empleados WHERE id_empleado = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ message: "Empleado no encontrado" });
        res.json(results[0]);
    });
});

// Crear nuevo empleado
router.post("/", (req, res) => {
    const { nombre, puesto } = req.body;

    if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });

    const sql = "INSERT INTO empleados (nombre, puesto) VALUES (?, ?)";
    db.query(sql, [nombre, puesto], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Empleado agregado", id: result.insertId });
    });
});

// Actualizar empleado
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, puesto } = req.body;

    const sql = "UPDATE empleados SET nombre = ?, puesto = ? WHERE id_empleado = ?";

    db.query(sql, [nombre, puesto, id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Empleado actualizado" });
    });
});

// Eliminar empleado
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM empleados WHERE id_empleado = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Empleado eliminado" });
    });
});

export default router;