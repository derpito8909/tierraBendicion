/**
 * Middleware para el manejo global de errores en la aplicación.
 *
 * Este middleware captura los errores que ocurren en las rutas o en otros middleware y
 * envía una respuesta adecuada al cliente. Si el error es una instancia de `CustomError`,
 * utiliza el código de estado y el mensaje definidos en esa clase. Para otros errores,
 * devuelve un código de estado 500 con un mensaje genérico.
 *
 * @middleware
 * @module errorHandler
 */
import { CustomError } from "../lib/customErrors.js";

/**
 * Middleware para el manejo global de errores en la aplicación.
 *
 * Este middleware captura los errores que ocurren en las rutas o en otros middleware y
 * envía una respuesta adecuada al cliente. Si el error es una instancia de `CustomError`,
 * utiliza el código de estado y el mensaje definidos en esa clase. Para otros errores,
 * devuelve un código de estado 500 con un mensaje genérico.
 *
 * @function errorHandler
 * @param {Error} err - El objeto de error capturado.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - La función de middleware `next` de Express. No se usa en este middleware pero se incluye para cumplir con la firma estándar.
 *
 * @returns {void} Este middleware no devuelve nada, pero envía una respuesta al cliente.
 *
 * @example
 * // Ejemplo de uso en una aplicación Express
 * app.use(errorHandler);
 *
 * @example
 * // Ejemplo de un CustomError lanzado en un controlador
 * throw new CustomError("Recurso no encontrado", 404); *
 *
 */
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Registro del error en la consola para depuración

  if (err instanceof CustomError) {
    // Si el error es una instancia de CustomError, usa su código de estado y mensaje
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Para otros tipos de errores, enviar una respuesta con el código de estado 500 y un mensaje
  res.status(500).send({ message: err.message });
};
