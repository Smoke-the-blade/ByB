import db from "../db.js";

// Crear venta vacía
export const crearVenta = async (id_empleado) => {
    const [result] = await db.query(
        "INSERT INTO ventas (id_empleado, total) VALUES (?, 0)",
        [id_empleado]
    );
    return result;
};

// Agregar detalle + actualizar stock + movimientos + recalcular total
export const agregarDetalle = async (id_venta, id_producto, cantidad) => {
    // 1. Obtener precio actual del producto
    const [prodRows] = await db.query(
        "SELECT precio_venta, stock FROM productos WHERE id_producto = ?",
        [id_producto]
    );

    if (prodRows.length === 0) throw new Error("Producto no existe");

    const producto = prodRows[0];

    if (producto.stock < cantidad) throw new Error("Stock insuficiente");

    const precio_unitario = producto.precio_venta;

    // 2. Insertar detalle
    const [detalle] = await db.query(
        `INSERT INTO venta_detalle (id_venta, id_producto, cantidad, precio_unitario)
         VALUES (?, ?, ?, ?)`,
        [id_venta, id_producto, cantidad, precio_unitario]
    );

    // 3. Actualizar stock del producto
    await db.query(
        "UPDATE productos SET stock = stock - ? WHERE id_producto = ?",
        [cantidad, id_producto]
    );

    // 4. Registrar movimiento de stock
    await db.query(
        `INSERT INTO movimientos_stock (id_producto, tipo, cantidad)
         VALUES (?, 'salida', ?)`,
        [id_producto, cantidad]
    );

    // 5. Recalcular total de la venta
    await db.query(
        `UPDATE ventas
         SET total = (SELECT SUM(cantidad * precio_unitario) FROM venta_detalle WHERE id_venta = ?)
         WHERE id_venta = ?`,
        [id_venta, id_venta]
    );

    return detalle;
};

// Venta completa
export const obtenerVentaCompleta = async (id) => {
    const [[venta]] = await db.query(
        "SELECT * FROM ventas WHERE id_venta = ?",
        [id]
    );

    if (!venta) return null;

    const [detalles] = await db.query(
        `SELECT vd.*, p.nombre
         FROM venta_detalle vd
         JOIN productos p ON vd.id_producto = p.id_producto
         WHERE id_venta = ?`,
        [id]
    );

    return {
        ...venta,
        detalles
    };
};

// Listar ventas
export const listarVentas = async () => {
    const [ventas] = await db.query(
        "SELECT id_venta, fecha, total, id_empleado FROM ventas ORDER BY fecha DESC"
    );
    return ventas;
};