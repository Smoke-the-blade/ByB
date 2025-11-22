import * as ventasService from "../services/ventasService.js";

// Crear venta vacía
export const crearVenta = async (req, res) => {
    try {
        const { id_empleado } = req.body;

        if (!id_empleado) {
            return res.status(400).json({ message: "id_empleado es requerido" });
        }

        const venta = await ventasService.crearVenta(id_empleado);

        res.json({
            message: "Venta creada",
            id_venta: venta.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Agregar detalle a la venta
export const agregarDetalle = async (req, res) => {
    try {
        const id_venta = req.params.id;
        const { id_producto, cantidad } = req.body;

        if (!id_producto || !cantidad) {
            return res.status(400).json({ message: "Datos incompletos" });
        }

        const resultado = await ventasService.agregarDetalle(id_venta, id_producto, cantidad);

        res.json({
            message: "Detalle agregado a la venta",
            resultado
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Venta completa (venta + detalles)
export const obtenerVentaCompleta = async (req, res) => {
    try {
        const venta = await ventasService.obtenerVentaCompleta(req.params.id);

        if (!venta) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        res.json(venta);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Listar ventas
export const listarVentas = async (req, res) => {
    try {
        const ventas = await ventasService.listarVentas();
        res.json(ventas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};