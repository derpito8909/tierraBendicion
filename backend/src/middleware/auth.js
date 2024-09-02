/**
 * Middleware de autorización basado en roles para rutas protegidas.
 *
 * Este middleware verifica la autenticidad del token JWT proporcionado en el encabezado de la solicitud
 * y valida si el usuario tiene el rol requerido para acceder a la ruta.
 *
 * @middleware
 * @module authRol
 */

import { verifyToken } from "../lib/jwt.js";
import { UnauthorizedError, ForbiddenError } from "../lib/customErrors.js";

/**
 *
 * @function authRol
 * @param {string} requiredRole - El rol necesario para acceder a la ruta.
 *                                Si es "pastor", solo los usuarios con el atributo `isAdmin` en su token pueden acceder.
 * @returns {Function} Middleware de Express que valida el token y el rol del usuario.
 *
 * @example
 * // Uso en una ruta protegida
 * app.use("/admin", authRol("pastor"), adminController);
 *
 * @throws {UnauthorizedError} Si no se proporciona un token o si el token es inválido.
 * @throws {ForbiddenError} Si el usuario no tiene el rol adecuado para acceder a la ruta.
 */
export const authRol = (requiredRole) => {
  return async (req, res, next) => {
    // validación de que efectivamente se pasó un token
    let token = req.headers["authorization"];
    if (!token) {
      return next(new UnauthorizedError("Acceso no autorizado, porfavor inicie sesión"));
    }

    //Vamos a extraer el token que necesitamos, quitando la parabra Bearer que hay antes
    token = token.split(" ")[1];
    if (!token) {
      return next(new UnauthorizedError("Acceso no autorizado, porfavor inicie sesión"));
    }

    // VERIFICACIÓN DEL TOKEN
    try {
      // se decodifica el token
      const decoded = await verifyToken(token);

      // validación de rol
      // Si la ruta requiere rol === admin PERO no tiene en el token la característica de Admin = true
      if (requiredRole === "pastor" && !decoded.isAdmin) {
        return next(new ForbiddenError("Acceso denegado, no tiene permisos de realizar esta operacion"));
      }

      req.user = decoded;
    } catch (error) {
      return next(new UnauthorizedError("Falló la autenticación con el token, token invalido", error.message || error));
    }

    // indica que debe continuar con el siguiente intermediario o controlador
    next();
  };
};
