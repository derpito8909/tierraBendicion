/* archivo para implementar la logica del servicio de autenticacion de usuario */
import { generateToken } from "../lib/jwt.js";
import { findUserByEmail, validatePassword, createPayload } from "../services/authHelpers.js";
import { ValidationError, NotFoundError, InternalServerError } from "../lib/customErrors.js";

/**
 * Servicio de autenticación para el inicio de sesión de usuarios.
 *
 * Esta función maneja la lógica del inicio de sesión de un usuario, incluyendo la validación del email y la contraseña,
 * la generación del payload y la creación de un token JWT para el usuario autenticado.
 *
 * @async
 * @function loginService
 * @param {Object} req - Objeto de solicitud de Express, que contiene los datos de entrada para el inicio de sesión.
 * @param {Object} req.body - Cuerpo de la solicitud, que debe incluir el email y la contraseña del usuario.
 * @param {string} req.body.email - El email del usuario que intenta iniciar sesión.
 * @param {string} req.body.password - La contraseña del usuario.
 * @param {Object} res - Objeto de respuesta de Express, utilizado para enviar la respuesta al cliente.
 * @param {Function} next - Función de middleware de Express, llamada para pasar el control al siguiente middleware en caso de error.
 * @returns {Promise<void>} Devuelve una respuesta JSON con el token generado si la autenticación es exitosa,
 * o pasa un error al siguiente middleware en caso de fallar.
 *
 * @throws {NotFoundError} Si no se encuentra un usuario con el email proporcionado.
 * @throws {ValidationError} Si la contraseña proporcionada no coincide con la del usuario encontrado.
 * @throws {InternalServerError} Si ocurre un error inesperado durante el proceso de autenticación.
 *
 * @example
 * // Ejemplo de solicitud
 * POST /login
 * {
 *   "email": "usuario@example.com",
 *   "password": "contraseñaSegura123"
 * }
 *
 * // Ejemplo de respuesta exitosa
 * {
 *   "estado": "200",
 *   "mensaje": "Inicio de sesión exitoso",
 *   "tokenGenerado": "jwt-token-aqui"
 * }
 */
const loginService = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validación de usuario
    const userFound = await findUserByEmail(email);

    if (!userFound) {
      return next(new NotFoundError("Usuario no encontrado, por favor registrarse"));
    }
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
      status: "200",
      message: userFound.fullname,
      token: token,
    });
  } catch (error) {
    next(new InternalServerError(`Hubo un error al intentar iniciar sesión: ${error.message || error}`));
  }
};

export default loginService;
