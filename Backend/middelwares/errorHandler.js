export const errorHandler = (err, req, res, next) => {
    console.error("🔥 ERROR CAPTURADO:", err);

    let status = err.status || 500;

    res.status(status).json({
        ok: false,
        message: err.message || "Error interno del servidor",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};