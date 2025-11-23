import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { errorHandler } from "./middlewares/errorHandler.js";

import productosRoutes from "./routes/productos.js";
import empleadosRoutes from "./routes/empleados.js";
import ventasRoutes from "./routes/ventas.js";
import informesRoutes from "./routes/informes.js";

dotenv.config();

const app = express();

// ==============================
// Middlewares globales
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// Rutas principales del sistema
// ==============================
app.use("/api/productos", productosRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/informes", informesRoutes);

// ==============================
// Ruta por defecto
// ==============================
app.get("/", (req, res) => {
    res.json({
        message: "API de Stock funcionando correctamente",
        status: "OK",
        version: "1.0.0"
    });
});

app.use(errorHandler);

// ==============================
// Servidor ON
// ==============================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto " + PORT);
});