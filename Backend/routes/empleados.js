import express from "express";
import {
    getEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
} from "../controllers/empleadosController.js";

import { empleadosValidation } from "../validations/empleadosValidation.js";
import { validateFields } from "../middlewares/validateFields.js";

const router = express.Router();

// Obtener todos
router.get("/", getEmpleados);

// Obtener por ID
router.get("/:id", getEmpleadoById);

// Crear empleado (validaciones aquí)
router.post(
    "/",
    empleadosValidation,
    validateFields,
    createEmpleado
);

// Actualizar empleado (podemos usar mismas validaciones)
router.put(
    "/:id",
    empleadosValidation,
    validateFields,
    updateEmpleado
);

// Borrar empleado
router.delete("/:id", deleteEmpleado);

export default router;