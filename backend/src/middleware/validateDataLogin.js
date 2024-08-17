/**
 * Middleware para validar los datos de los miembros.
 *
 * Este middleware garantiza la consistencia y seguridad de los datos
 * antes de que sean procesados por los controladores y afecten la base de datos.
 * Utiliza `express-validator` para validar y sanitizar los datos de entrada.
 *
 * @middleware
 * @module validateDataLogin
 */
import { check, validationResult } from "express-validator";

/** Configuración personalizada de `validationResult` para simplificar los mensajes de error. */
const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

/**
 * Middleware de validación para datos de miembros.
 *
 * @function
 * @name validateDataLogin
 * @description
 * Este middleware valida los siguientes campos:
 *
 * - `email`: Debe ser una cadena no vacía, con el formato correcto de un correo electronico tipo "valor@provedor.com".
 * - `password`: Debe ser una cadena no vacia y deber ser minimo de 6 caracters de longitud.
 *
 * Si la validación falla, se devolverá una respuesta con código 400 y los errores.
 * Si la validación es exitosa, continúa con el siguiente middleware o controlador.
 *
 * @param {object} req - El objeto de solicitud (request).
 * @param {object} res - El objeto de respuesta (response).
 * @param {function} next - La función para pasar el control al siguiente middleware.
 */
export const validateDataLogin = [
  check("email").normalizeEmail().isEmail().withMessage("Digite un correo electronico valido"),

  check("password").trim().escape().isLength({ min: 6 }).withMessage("La contraseña debe ser minimo de 6 caracteres de longitud"),

  (req, res, next) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];
