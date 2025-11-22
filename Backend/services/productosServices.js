import db from "../db.js";

// Obtener todos los productos
export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM productos");
    return rows;
};

// Obtener un producto por ID
export const getById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM productos WHERE id_producto = ?",
        [id]
    );
    return rows[0];
};

// Crear producto
export const create = async (data) => {
    const sql = `
        INSERT INTO productos
        (nombre, precio_compra, precio_venta, proveedor, cantidad, stock)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const params = [
        data.nombre,
        data.precio_compra,
        data.precio_venta,
        data.proveedor ?? null,
        data.cantidad ?? 0,
        data.cantidad ?? 0
    ];

    const [result] = await db.query(sql, params);
    return result;
};

// Actualizar producto
export const update = async (id, data) => {
    const sql = `
        UPDATE productos
        SET nombre = ?, precio_compra = ?, precio_venta = ?, proveedor = ?, cantidad = ?, stock = ?
        WHERE id_producto = ?
    `;

    const params = [
        data.nombre,
        data.precio_compra,
        data.precio_venta,
        data.proveedor ?? null,
        data.cantidad,
        data.stock,
        id
    ];

    const [result] = await db.query(sql, params);
    return result;
};

// Eliminar producto
export const remove = async (id) => {
    const [result] = await db.query(
        "DELETE FROM productos WHERE id_producto = ?",
        [id]
    );
    return result;
};