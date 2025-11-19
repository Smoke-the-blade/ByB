const express = require("express");
const cors = require("cors");
const productosRoutes = require("./routes/productos.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/productos", productosRoutes);

app.listen(3000, () => {
  console.log("Backend API ejecutándose en http://localhost:3000");
});