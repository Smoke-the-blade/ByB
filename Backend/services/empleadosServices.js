import db from "../db.js";

// Obtener todos
export const getAll = async () => {
    const [rows] = await db.query("SELECT * FROM empleados");
    return rows;
};

// Obtener por ID
export const getById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM empleados WHERE id_empleado = ?",
        [id]
    );
    return rows[0];
};

// Crear
export const create = async (data) => {
    const sql = `
        INSERT INTO empleados (nombre, puesto, telefono, direccion, email)
        VALUES (?, ?, ?, ?, ?)
    `;

    const params = [
        data.nombre,
        data.puesto ?? null,
        data.telefono ?? null,
        data.direccion ?? null,
        data.email ?? null
    ];

    const [result] = await db.query(sql, params);
    return result;
};

// Actualizar
export const update = async (id, data) => {
    const sql = `
        UPDATE empleados
        SET nombre = ?, puesto = ?, telefono = ?, direccion = ?, email = ?
        WHERE id_empleado = ?
    `;

    const params = [
        data.nombre,
        data.puesto ?? null,
        data.telefono ?? null,
        data.direccion ?? null,
        data.email ?? null,
        id
    ];

    const [result] = await db.query(sql, params);
    return result;
};

// Eliminar
export const remove = async (id) => {
    const [result] = await db.query(
        "DELETE FROM empleados WHERE id_empleado = ?",
        [id]
    );
    return result;
};