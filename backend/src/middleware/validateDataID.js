/**
 * Middleware para validar los datos de los miembros.
 *
 * Este middleware garantiza la consistencia y seguridad de los datos
 * antes de que sean procesados por los controladores y afecten la base de datos.
 * Utiliza `express-validator` para validar y sanitizar los datos de entrada.
 *
 * @middleware
 * @module validateObjectId
 */

import { validationResult, param } from "express-validator";
import mongoose from "mongoose";

/** Configuración personalizada de `validationResult` para simplificar los mensajes de error. */
const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

/**
 * Middleware de validación para datos de miembros.
 *
 * @function
 * @name validateObjectId
 * @description
 * Este middleware valida los siguientes campos:
 *
 * - `id`: validad si el Id enviado tiene el formato correcto de un objectID de mongouse.
 *
 * Si la validación falla, se devolverá una respuesta con código 400 y los errores.
 * Si la validación es exitosa, continúa con el siguiente middleware o controlador.
 *
 * @param {object} req - El objeto de solicitud (request).
 * @param {object} res - El objeto de respuesta (response).
 * @param {function} next - La función para pasar el control al siguiente middleware.
 */
export const validateObjectId = [
  param("id").custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("El id es invalido");
    }
    return true;
  }),
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
