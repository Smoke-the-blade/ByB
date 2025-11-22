import db from "../db.js";

// ======================================================
// 1. Ventas por rango de fechas
// ======================================================
export const ventasPorFecha = async (desde, hasta) => {
    const [rows] = await db.query(
        `SELECT v.id_venta, v.fecha, v.total, e.nombre AS empleado
         FROM ventas v
         LEFT JOIN empleados e ON v.id_empleado = e.id_empleado
         WHERE DATE(v.fecha) BETWEEN ? AND ?
         ORDER BY v.fecha DESC`,
        [desde, hasta]
    );
    return rows;
};

// ======================================================
// 2. Productos con bajo stock
// ======================================================
export const productosBajoStock = async (limite) => {
    const [rows] = await db.query(
        `SELECT id_producto, nombre, stock
         FROM productos
         WHERE stock <= ?
         ORDER BY stock ASC`,
        [limite]
    );
    return rows;
};

// ======================================================
// 3. Productos más vendidos (ranking)
// ======================================================
export const productosMasVendidos = async (limite) => {
    const [rows] = await db.query(
        `SELECT 
            p.id_producto,
            p.nombre,
            SUM(vd.cantidad) AS total_vendido
         FROM venta_detalle vd
         JOIN productos p ON vd.id_producto = p.id_producto
         GROUP BY p.id_producto, p.nombre
         ORDER BY total_vendido DESC
         LIMIT ?`,
        [limite]
    );
    return rows;
};

// ======================================================
// 4. Ingresos totales de ventas
// ======================================================
export const ingresosTotales = async () => {
    const [[result]] = await db.query(
        `SELECT SUM(total) AS ingresos_totales FROM ventas`
    );
    return result;
};

// ======================================================
// 5. Movimientos de stock
// ======================================================
export const movimientosStock = async () => {
    const [rows] = await db.query(
        `SELECT 
            m.id_movimiento,
            p.nombre AS producto,
            m.tipo,
            m.cantidad,
            m.fecha
         FROM movimientos_stock m
         JOIN productos p ON m.id_producto = p.id_producto
         ORDER BY m.fecha DESC`
    );
    return rows;
};