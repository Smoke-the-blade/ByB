PASO 1 — Crear la carpeta del backend

En tu proyecto:

Stock0.1a/
   frontend/
   backend/   ← crear esta carpeta


Entrá a esa carpeta:

cd backend

✅ PASO 2 — Iniciar el proyecto Node

Ejecutá:

npm init -y

✅ PASO 3 — Instalar dependencias necesarias

Ejecutá:

npm install express mysql2 cors dotenv


Explicación:

express → para crear la API

mysql2 → para conectarnos a MySQL

cors → permite que React pueda usar la API

dotenv → para variables de entorno (ej: contraseña)

✅ PASO 4 — Crear estructura de archivos del backend

Carpeta backend:

backend/
   server.js
   db.js
   .env
   routes/
      productos.js
      ventas.js
      empleados.js
      informes.js


Vamos creando paso por paso.

✅ PASO 5 — Archivo .env con los datos de MySQL

📄 backend/.env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=TU_PASSWORD
DB_NAME=panificados
PORT=4000


⚠ Cambiá TU_PASSWORD por tu contraseña real de MySQL.

✅ PASO 6 — Crear la conexión a MySQL

📄 backend/db.js

import mysql from "mysql2";

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection((err) => {
    if (err) {
        console.error("Error de conexión a la Base de Datos:", err);
    } else {
        console.log("Conectado a MySQL");
    }
});

export default db;

✅ PASO 7 — Crear el servidor Express

📄 backend/server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productosRoutes from "./routes/productos.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/productos", productosRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto " + PORT);
});

✅ PASO 8 — Crear la primera API: Productos

📄 backend/routes/productos.js

import express from "express";
import db from "../db.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", (req, res) => {
    db.query("SELECT * FROM productos", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Agregar producto
router.post("/", (req, res) => {
    const { nombre, marca, precio_compra, precio_venta, proveedor, cantidad } = req.body;

    const sql =
        "INSERT INTO productos (nombre, marca, precio_compra, precio_venta, proveedor, cantidad) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [nombre, marca, precio_compra, precio_venta, proveedor, cantidad], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Producto agregado", id: result.insertId });
    });
});

export default router;

Para probarlo:

Entrá a la carpeta backend:

cd backend
node server.js


Deberías ver:

Conectado a MySQL
Servidor corriendo en el puerto 4000


Y si vas a:

👉 http://localhost:4000/api/productos

Vas a ver un JSON (lista de productos).

fetch("http://localhost:4000/api/productos")


Stock (CRUD completo)

Ventas

Empleados

Informes

Login real con MySQL (usuarios)