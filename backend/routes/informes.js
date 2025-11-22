import express from "express";
import {
    ventasPorFecha,
    productosBajoStock,
    productosMasVendidos,
    ingresosTotales,
    movimientosStock
} from "../controllers/informesController.js";

const router = express.Router();

// Ventas por rango de fechas
router.get("/ventas-fecha", ventasPorFecha);

// Productos con poco stock
router.get("/bajo-stock", productosBajoStock);

// Ranking de productos
router.get("/mas-vendidos", productosMasVendidos);

// Total de ingresos
router.get("/ingresos", ingresosTotales);

// Movimientos de stock
router.get("/movimientos", movimientosStock);

export default router;