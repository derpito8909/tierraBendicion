/* 
 archivo la establecer la configuracion de los metodos de crear y validar tokens jwt utilizados en el API
 */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { InternalServerError } from "./customErrors.js";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

/**
 * funcion para generar token (JWT)
 * @param {payload} Object - objeto con los datos para llevars en el cuerpo del token.
 * @returns {Promise} objecto promesa ya sea con un error o el sctring con el valor del token generado
 */
export function generateToken(payload) {
  // nosotros vamos a configurar de una vez esta función para que sea asincrónica
  return new Promise((resolve, reject) => {
    // para generarlo necesitamos payload, clave secreta, tiempo de expiración
    // Además, le voy a decir cómo debe trabajar con los errores y aciertos
    jwt.sign(payload, secretKey, { expiresIn: "1h" }, (error, token) => {
      // validaar si hay error al generar token
      if (error) {
        // le decimos qué pasa si todo sale mal
        reject(new InternalServerError("Error al generar JWT " + error.message));
      } else {
        // le decimos qué pasa si todo bien
        resolve(token);
      }
    });
  });
}

/**
 * funcion para verificar token (JWT)
 * @param {token} string - cadena de cararteres con el token JWT enviado desde navegador
 * @returns {Promise} objecto promesa ya sea con un error o el token decodificado
 */
export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      // validando decodificación
      if (error) {
        // le decimos qué pasa si todo sale mal
        reject(new InternalServerError("Error al decodificar JWT" + error.message));
      } else {
        // le decimos qué pasa si todo bien
        resolve(decoded);
      }
    });
  });
}
