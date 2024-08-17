/**
 * Middleware para validar los datos de las actividades.
 *
 * Este middleware garantiza la consistencia y seguridad de los datos
 * antes de que sean procesados por los controladores y afecten la base de datos.
 * Utiliza `express-validator` para validar y sanitizar los datos de entrada.
 *
 * @middleware
 * @module validateDataActivity
 */

import { check, validationResult } from "express-validator";

/** Configuración personalizada de `validationResult` para simplificar los mensajes de error. */
const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

/**
 * Middleware de validación para datos de las actividades
 *
 * @function
 * @name validateDataActivity
 * @description
 * Este middleware valida los siguientes campos:
 *
 * - `name`: Debe ser una cadena no vacía, con un máximo de 50 caracteres.
 * - `description`: puede ser un cadena vacia o con un maximo de 50 carecteres.
 * - `date`: Debe ser una fecha válida y no vacía.
 * - `attendance`: debe ser un numero entero positivo.
 *
 * Si la validación falla, se devolverá una respuesta con código 400 y los errores.
 * Si la validación es exitosa, continúa con el siguiente middleware o controlador.
 *
 * @param {object} req - El objeto de solicitud (request).
 * @param {object} res - El objeto de respuesta (response).
 * @param {function} next - La función para pasar el control al siguiente middleware.
 */
export const validateDataActivity = [
  check("name").trim().escape().notEmpty().withMessage("El nombre es requerido").isLength({ max: 50 }).withMessage("El nombre no puede superar los 50 caracteres"),

  check("description").trim().escape().optional().isLength({ max: 50 }).withMessage("La descripcion no puede superar los 50 caracteres"),

  check("date").isDate().notEmpty().withMessage("Fecha es requerida"),

  check("attendance").toInt().isInt({ min: 0 }).withMessage("la edad debe ser un numero positivo"),

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
