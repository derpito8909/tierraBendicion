/* archivo para implementar la logica del servicio de autenticacion de usuario */
import { generateToken } from "../lib/jwt.js";
import { findUserByEmail, validatePassword, createPayload } from "../services/authHelpers.js";
import { ValidationError, NotFoundError, InternalServerError } from "../lib/customErrors.js";

/**
 * funcion implentar la del incio de sesion
 * @param {payload} Object - objeto con los datos para llevars en el cuerpo del token.
 * @returns {Promise} objecto promesa ya sea con un error o el sctring con el valor del token generado
 */
const loginService = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validación de usuario
    const userFound = await findUserByEmail(email);

    if (!userFound) {
      return next(new NotFoundError("Usuario no encontrado, por favor registrarse"));
    }
    console.log(password);
    // Validación de contraseña
    const isValidPassword = await validatePassword(password, userFound.password);
    if (!isValidPassword) {
      return next(new ValidationError("Error al iniciar sesión, contraseña incorrecta"));
    }

    // Creación del payload
    const payload = createPayload(userFound);

    // Generación del token
    const token = await generateToken(payload);

    return res.status(200).json({
      estado: "200",
      mensaje: "Inicio de sesión exitoso",
      tokenGenerado: token,
    });
  } catch (error) {
    next(new InternalServerError(`Hubo un error al intentar iniciar sesión: ${error.message || error}`));
  }
};

export default loginService;
