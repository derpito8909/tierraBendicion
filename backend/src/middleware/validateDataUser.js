/**
 * Middleware para validar los datos de los miembros.
 *
 * Este middleware garantiza la consistencia y seguridad de los datos
 * antes de que sean procesados por los controladores y afecten la base de datos.
 * Utiliza `express-validator` para validar y sanitizar los datos de entrada.
 *
 * @middleware
 * @module validateDataUser
 */
import { check, validationResult } from "express-validator";
import { ValidationError } from "../lib/customErrors.js";

/** Configuración personalizada de `validationResult` para simplificar los mensajes de error. */
const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

/**
 * Middleware de validación para datos de miembros.
 *
 * @function
 * @name validateDataUser
 * @description
 * Este middleware valida los siguientes campos:
 *
 * - `fullname`: Debe ser una cadena no vacía, con un máximo de 50 caracteres.
 * - `email`: Debe ser una cadena no vacía, con el formato correcto de un correo electronico tipo "valor@provedor.com".
 * - `password`: Debe ser una cadena no vacia, que contenga almenos un dato numerico, y un caracter especial tipo estos ("!@#$%^&*")
 *
 * Si la validación falla, se devolverá una respuesta con código 400 y los errores.
 * Si la validación es exitosa, continúa con el siguiente middleware o controlador.
 *
 * @param {object} req - El objeto de solicitud (request).
 * @param {object} res - El objeto de respuesta (response).
 * @param {function} next - La función para pasar el control al siguiente middleware.
 */
export const validateDataUser = [
  check("fullname").trim().escape().notEmpty().withMessage("El nombre completo es requerido").isLength({ max: 50 }).withMessage("El nombre completo no puede superar los 50 caracteres"),

  check("email").normalizeEmail().isEmail().withMessage("Digite un correo electronico valido"),

  check("password")
    .trim()
    .escape()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe se minimo de 8 caracteres de longitud")
    .matches(/\d/)
    .withMessage("la contraseña debe tener almenos un numero")
    .matches(/[!@#$%^&*]/)
    .withMessage("La contraseña debe tener alguno de estos caracteres especiales ! @ # $ % ^ & *"),

  (req, res, next) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    next();
  },
];
