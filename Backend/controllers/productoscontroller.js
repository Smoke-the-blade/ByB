import * as productosService from "../services/productosServices.js";

// Obtener todos los productos
export const getProductos = async (req, res) => {
    try {
        const productos = await productosService.getAll();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener producto por ID
export const getProductoById = async (req, res) => {
    try {
        const producto = await productosService.getById(req.params.id);

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json(producto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear producto
export const createProducto = async (req, res) => {
    try {
        const data = req.body;

        // Validación mínima
        if (!data.nombre || !data.precio_compra || !data.precio_venta) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        const result = await productosService.create(data);

        res.json({
            message: "Producto creado",
            id: result.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar producto
export const updateProducto = async (req, res) => {
    try {
        const result = await productosService.update(req.params.id, req.body);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto actualizado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar producto
export const deleteProducto = async (req, res) => {
    try {
        const result = await productosService.remove(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};