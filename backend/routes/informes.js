const express = require("express");
const router = express.Router();
const db = require("../db"); // tu conexión mysql2/promise

// --------------------------------------------------
// 1) PRODUCTOS CON BAJO STOCK
// --------------------------------------------------
router.get("/bajo-stock", async (req, res) => {
    const { limite = 10 } = req.query;
    try {
        const [rows] = await db.query(
            `SELECT id_producto, nombre, stock 
             FROM productos 
             WHERE stock <= ? 
             ORDER BY stock ASC`,
            [limite]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --------------------------------------------------
// 2) VENTAS POR RANGO DE FECHAS
// --------------------------------------------------
router.get("/ventas/rango", async (req, res) => {
    const { desde, hasta } = req.query;

    if (!desde || !hasta)
        return res.status(400).json({ message: "Faltan fechas (desde y hasta)" });

    try {
        const [rows] = await db.query(
            `SELECT v.id_venta, v.fecha, v.total, e.nombre AS empleado
             FROM ventas v
             LEFT JOIN empleados e ON e.id_empleado = v.id_empleado
             WHERE DATE(v.fecha) BETWEEN ? AND ?
             ORDER BY v.fecha DESC`,
            [desde, hasta]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --------------------------------------------------
// 3) MOVIMIENTOS DE STOCK (filtrable)
// --------------------------------------------------
router.get("/stock/movimientos", async (req, res) => {
    const { id_producto, tipo } = req.query;

    let sql = `
        SELECT m.*, p.nombre
        FROM movimientos_stock m
        INNER JOIN productos p ON p.id_producto = m.id_producto
        WHERE 1=1
    `;
    let params = [];

    if (id_producto) {
        sql += " AND m.id_producto = ?";
        params.push(id_producto);
    }

    if (tipo) {
        sql += " AND m.tipo = ?";
        params.push(tipo);
    }

    sql += " ORDER BY m.fecha DESC";

    try {
        const [rows] = await db.query(sql, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --------------------------------------------------
// 4) TOP PRODUCTOS MÁS VENDIDOS
// --------------------------------------------------
router.get("/ventas/top", async (req, res) => {
    const { limite = 5 } = req.query;

    try {
        const [rows] = await db.query(
            `SELECT 
                p.id_producto,
                p.nombre,
                SUM(d.cantidad) AS total_vendido,
                SUM(d.cantidad * d.precio_unitario) AS ingreso_generado
             FROM venta_detalle d
             INNER JOIN productos p ON p.id_producto = d.id_producto
             GROUP BY p.id_producto
             ORDER BY total_vendido DESC
             LIMIT ?`,
            [parseInt(limite)]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --------------------------------------------------
// 5) INGRESOS DEL DÍA
// --------------------------------------------------
router.get("/ventas/hoy", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT SUM(total) AS ingresos_hoy
            FROM ventas
            WHERE DATE(fecha) = CURDATE()
        `);

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --------------------------------------------------
// 6) INGRESOS DEL MES
// --------------------------------------------------
router.get("/ventas/mes", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT SUM(total) AS ingresos_mes
            FROM ventas
            WHERE MONTH(fecha) = MONTH(CURDATE())
            AND YEAR(fecha) = YEAR(CURDATE())
        `);

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --------------------------------------------------
// 7) GANANCIAS (precio_venta - precio_compra)
// --------------------------------------------------
router.get("/ganancias", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                p.id_producto,
                p.nombre,
                SUM(d.cantidad) AS unidades_vendidas,
                SUM(d.cantidad * d.precio_unitario) AS ingreso,
                SUM(d.cantidad * p.precio_compra) AS costo,
                SUM(d.cantidad * d.precio_unitario) - SUM(d.cantidad * p.precio_compra) AS ganancia
            FROM venta_detalle d
            INNER JOIN productos p ON p.id_producto = d.id_producto
            GROUP BY p.id_producto
            ORDER BY ganancia DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;