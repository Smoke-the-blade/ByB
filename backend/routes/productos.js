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

// Obtener un producto por ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM productos WHERE id_producto = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
});

// Buscar productos por nombre
router.get("/buscar/:nombre", (req, res) => {
    const { nombre } = req.params;
    const sql = "SELECT * FROM productos WHERE nombre LIKE ?";
    db.query(sql, [`%${nombre}%`], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Agregar producto
router.post("/", (req, res) => {
    const { nombre, precio_compra, precio_venta, proveedor, cantidad, id_proveedor } = req.body;

    const sql = `INSERT INTO productos 
    (nombre, precio_compra, precio_venta, proveedor, cantidad, stock, id_proveedor)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [nombre, precio_compra, precio_venta, proveedor, cantidad, cantidad, id_proveedor], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Producto agregado", id: result.insertId });
    });
});

// Actualizar producto
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, precio_compra, precio_venta, proveedor, cantidad, stock, id_proveedor } = req.body;

    const sql = `UPDATE productos SET 
        nombre = ?, precio_compra = ?, precio_venta = ?, proveedor = ?, 
        cantidad = ?, stock = ?, id_proveedor = ?
        WHERE id_producto = ?`;

    db.query(sql, [nombre, precio_compra, precio_venta, proveedor, cantidad, stock, id_proveedor, id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Producto actualizado" });
    });
});

// Eliminar producto
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM productos WHERE id_producto = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Producto eliminado" });
    });
});

// Modificar stock
router.put("/:id/stock", (req, res) => {
    const { id } = req.params;
    const { cantidad } = req.body;

    db.query(
        "UPDATE productos SET stock = stock + ? WHERE id_producto = ?",
        [cantidad, id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Stock actualizado" });
        }
    );
});

export default router;
