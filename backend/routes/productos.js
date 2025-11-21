import express from "express";
import db from "../db.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", (req, res) => {
    db.query("SELECT * FROM productos", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Agregar producto
router.post("/", (req, res) => {
    const { nombre, marca, precio_compra, precio_venta, proveedor, cantidad } = req.body;

    const sql =
        "INSERT INTO productos (nombre, marca, precio_compra, precio_venta, proveedor, cantidad) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [nombre, marca, precio_compra, precio_venta, proveedor, cantidad], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Producto agregado", id: result.insertId });
    });
});

export default router;
