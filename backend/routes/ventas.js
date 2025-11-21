router.get("/ventas", async (req, res) => {
    try {
        const [ventas] = await db.query(`
            SELECT v.id_venta, v.fecha, v.total, e.nombre AS empleado
            FROM ventas v
            LEFT JOIN empleados e ON e.id_empleado = v.id_empleado
            ORDER BY v.fecha DESC
        `);

        res.json(ventas);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/ventas/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [[venta]] = await db.query(`
            SELECT v.*, e.nombre AS empleado
            FROM ventas v
            LEFT JOIN empleados e ON e.id_empleado = v.id_empleado
            WHERE v.id_venta = ?
        `, [id]);

        if (!venta)
            return res.status(404).json({ message: "Venta no encontrada" });

        const [detalle] = await db.query(`
            SELECT d.*, p.nombre 
            FROM venta_detalle d
            INNER JOIN productos p ON p.id_producto = d.id_producto
            WHERE d.id_venta = ?
        `, [id]);

        venta.detalle = detalle;

        res.json(venta);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/ventas", async (req, res) => {
    const { id_empleado } = req.body;

    try {
        const [result] = await db.query(
            "INSERT INTO ventas (id_empleado, total) VALUES (?, 0)",
            [id_empleado]
        );

        res.json({
            message: "Venta creada",
            id_venta: result.insertId
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/ventas/:id/agregar", async (req, res) => {
    const { id } = req.params; // id de venta
    const { id_producto, cantidad } = req.body;

    try {
        // Obtener precio de venta
        const [[producto]] = await db.query(
            "SELECT precio_venta, stock FROM productos WHERE id_producto = ?",
            [id_producto]
        );

        if (!producto)
            return res.status(404).json({ message: "Producto no encontrado" });

        if (producto.stock < cantidad)
            return res.status(400).json({ message: "Stock insuficiente" });

        const precio_unitario = producto.precio_venta;

        // 1) Insertar el detalle
        await db.query(`
            INSERT INTO venta_detalle (id_venta, id_producto, cantidad, precio_unitario)
            VALUES (?, ?, ?, ?)`,
            [id, id_producto, cantidad, precio_unitario]
        );

        // 2) Restar stock
        await db.query(`
            UPDATE productos SET stock = stock - ? WHERE id_producto = ?
        `, [cantidad, id_producto]);

        // 3) Registrar movimiento de stock
        await db.query(`
            INSERT INTO movimientos_stock (id_producto, tipo, cantidad)
            VALUES (?, 'salida', ?)
        `, [id_producto, cantidad]);

        // 4) Recalcular total
        await db.query(`
            UPDATE ventas
            SET total = (
                SELECT SUM(cantidad * precio_unitario)
                FROM venta_detalle
                WHERE id_venta = ?
            )
            WHERE id_venta = ?
        `, [id, id]);

        res.json({ message: "Item agregado correctamente" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/ventas/:id/detalle/:id_detalle", async (req, res) => {
    const { id, id_detalle } = req.params;

    try {
        // obtener detalle
        const [[detalle]] = await db.query(
            "SELECT * FROM venta_detalle WHERE id_detalle = ? AND id_venta = ?",
            [id_detalle, id]
        );

        if (!detalle)
            return res.status(404).json({ message: "Detalle no encontrado" });

        // devolver stock
        await db.query(`
            UPDATE productos SET stock = stock + ? WHERE id_producto = ?
        `, [detalle.cantidad, detalle.id_producto]);

        // movimiento de stock
        await db.query(`
            INSERT INTO movimientos_stock (id_producto, tipo, cantidad)
            VALUES (?, 'entrada', ?)
        `, [detalle.id_producto, detalle.cantidad]);

        // borrar detalle
        await db.query("DELETE FROM venta_detalle WHERE id_detalle = ?", [id_detalle]);

        // recalcular total
        await db.query(`
            UPDATE ventas
            SET total = (
                SELECT IFNULL(SUM(cantidad * precio_unitario), 0)
                FROM venta_detalle
                WHERE id_venta = ?
            )
            WHERE id_venta = ?
        `, [id, id]);

        res.json({ message: "Detalle eliminado" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/ventas/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query("DELETE FROM ventas WHERE id_venta = ?", [id]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Venta no encontrada" });

        res.json({ message: "Venta eliminada" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});