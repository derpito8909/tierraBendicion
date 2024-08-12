/*  Archivo que implemente el middleware para realizar el proceso de autorizacion a los procesos borrar y editar que tiene el administrador */

import { verifyToken } from "../lib/jwt.js";
import { UnauthorizedError, ForbiddenError } from "../lib/customErrors.js";

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
      console.log(requiredRole);

      // validación de rol
      // Si la ruta requiere rol === admin PERO no tiene en el token la característica de Admin = true
      if (requiredRole === "pastor" && !decoded.isAdmin) {
        return next(new ForbiddenError("Acceso denegado, no tiene permisos de realizar esta operacion"));
      }

      req.user = decoded;
    } catch (error) {
      error;
      return res.status(401).json({
        mensaje: "Falló la autenticación con el token, token invalido",
        error: error.message || error,
      });
    }

    // indica que debe continuar con el siguiente intermediario o controlador
    next();
  };
};
