import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); // <-- NECESARIO

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
