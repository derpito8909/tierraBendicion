/**
 * Middleware para validar los datos de los cursos.
 *
 * Este middleware garantiza la consistencia y seguridad de los datos
 * antes de que sean procesados por los controladores y afecten la base de datos.
 * Utiliza `express-validator` para validar y sanitizar los datos de entrada.
 *
 * @middleware
 * @module validateDataCourse
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
 * @name validateDataCourse
 * @description
 * Este middleware valida los siguientes campos:
 *
 * - `name`: Debe ser una cadena no vacía, con un máximo de 50 caracteres.
 * - `dateStart`: Debe ser una fecha válida y no vacía.
 * - `dateEnd`: Debe ser una fecha válida y no vacía.
 * - `schedule`: Debe ser una cadena con un máximo de 50 caracteres.
 *
 * Si la validación falla, se devolverá una respuesta con código 400 y los errores.
 * Si la validación es exitosa, continúa con el siguiente middleware o controlador.
 *
 * @param {object} req - El objeto de solicitud (request).
 * @param {object} res - El objeto de respuesta (response).
 * @param {function} next - La función para pasar el control al siguiente middleware.
 */
export const validateDataCourse = [
  check("name").trim().escape().notEmpty().withMessage("El nombre es requerido").isLength({ max: 50 }).withMessage("El nombre no puede superar los 50 caracteres"),

  check("dateStart").isDate().notEmpty().withMessage("Fecha de inicio es requerida"),

  check("dateEnd").isDate().notEmpty().withMessage("Fecha de inicio es requerida"),

  check("schedule").trim().escape().isLength({ max: 50 }).withMessage("el horario no puede superar los 50 caracteres"),

  (req, res, next) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    next();
  },
];
