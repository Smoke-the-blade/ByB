import express from "express";
import {
    crearVenta,
    agregarDetalle,
    obtenerVentaCompleta,
    listarVentas
} from "../controllers/ventasController.js";

const router = express.Router();

// Crear venta vacía
router.post("/", crearVenta);

// Agregar ítem a una venta
router.post("/:id/detalle", agregarDetalle);

// Obtener venta con sus detalles
router.get("/:id", obtenerVentaCompleta);

// Listar todas las ventas
router.get("/", listarVentas);

export default router;