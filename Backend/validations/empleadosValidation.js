import { body } from "express-validator";

export const empleadosValidation = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres"),

    body("apellido")
        .notEmpty().withMessage("El apellido es obligatorio"),

    body("dni")
        .notEmpty().withMessage("El DNI es obligatorio")
        .isNumeric().withMessage("El DNI debe ser numérico"),

    body("telefono")
        .optional()
        .isMobilePhone().withMessage("El teléfono no es válido"),

    body("email")
        .optional()
        .isEmail().withMessage("El email no es válido"),
];