/**
 * Middleware para validar los datos de los miembros.
 *
 * Este middleware garantiza la consistencia y seguridad de los datos
 * antes de que sean procesados por los controladores y afecten la base de datos.
 * Utiliza `express-validator` para validar y sanitizar los datos de entrada.
 *
 * @middleware
 * @module validateDataMember
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
 * @name validateDataMember
 * @description
 * Este middleware valida los siguientes campos:
 *
 * - `fullname`: Debe ser una cadena no vacía, con un máximo de 50 caracteres.
 * - `age`: Debe ser un numero entero positvo.
 * - `address`: debe ser una cadena con un máximo de 50 caracteres.
 * - `neighbourhood`: debe ser una cadena con un máximo de 50 caracteres.
 * - `reference`: debe ser una cadena con un máximo de 50 caracteres.
 * - `prayerRequest`: Debe ser una cadena con un máximo de 50 caracteres.
 * - `cellPhoneNumber`: Debe un numero de tipo numero telefonico no vacio.
 *
 * Si la validación falla, se devolverá una respuesta con código 400 y los errores.
 * Si la validación es exitosa, continúa con el siguiente middleware o controlador.
 *
 * @param {object} req - El objeto de solicitud (request).
 * @param {object} res - El objeto de respuesta (response).
 * @param {function} next - La función para pasar el control al siguiente middleware.
 */
export const validateDataMember = [
  check("fullname").trim().escape().notEmpty().withMessage("El nombre completo es requerido").isLength({ max: 50 }).withMessage("El nombre completo no puede superar los 50 caracteres"),

  check("age").toInt().isInt({ min: 0 }).withMessage("la edad debe ser un numero positivo"),

  check("address").trim().escape().isLength({ max: 50 }).withMessage("La direccion no puede superar los 50 caracteres"),

  check("neighbourhood").trim().escape().isLength({ max: 50 }).withMessage("El barrio no puede superar los 50 caracteres"),

  check("reference").trim().escape().isLength({ max: 50 }).withMessage("La referencia no puede superar los 50 caracteres"),

  check("prayerRequest").trim().escape().isLength({ max: 50 }).withMessage("La peticion de oracion no puede superar los 50 caracteres"),

  check("cellPhoneNumber").trim().escape().notEmpty().withMessage("El numero de telefono es requerido").isLength({ max: 10 }).withMessage("El numero de telefono no puede superar los 10 caracteres").isMobilePhone(),

  (req, res, next) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationError(errors.array()));
    }
    next();
  },
];
