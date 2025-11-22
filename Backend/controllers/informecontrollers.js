import * as informesService from "../services/informesService.js";

// Ventas por rango de fechas
export const ventasPorFecha = async (req, res) => {
    try {
        const { desde, hasta } = req.query;

        if (!desde || !hasta) {
            return res.status(400).json({ 
                message: "Parámetros requeridos: desde, hasta (YYYY-MM-DD)" 
            });
        }

        const data = await informesService.ventasPorFecha(desde, hasta);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Productos con bajo stock
export const productosBajoStock = async (req, res) => {
    try {
        const { limite = 10 } = req.query;

        const data = await informesService.productosBajoStock(parseInt(limite));
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Productos más vendidos
export const productosMasVendidos = async (req, res) => {
    try {
        const { limite = 10 } = req.query;

        const data = await informesService.productosMasVendidos(parseInt(limite));
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Ingresos totales
export const ingresosTotales = async (req, res) => {
    try {
        const data = await informesService.ingresosTotales();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Movimientos de stock
export const movimientosStock = async (req, res) => {
    try {
        const data = await informesService.movimientosStock();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};