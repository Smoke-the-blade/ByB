import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productosRoutes from "./routes/productos.js";
import empleadosRoutes from "./routes/empleados.js";
import ventasRoutes from "./routes/ventas.js";
import movimientosRoutes from "./routes/movimientos.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/productos", productosRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/movimientos", movimientosRoutes);


// Ruta base
app.get("/", (req, res) => {
    res.send("API de Stock funcionando ✔");
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error("Error en el servidor:", err);
    res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto " + PORT);
});