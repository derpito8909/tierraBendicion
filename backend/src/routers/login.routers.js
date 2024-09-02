/* Archivo para implementar la ruta de para el endpoint de rutas */
import { Router } from "express";
import loginService from "../controllers/login.controller.js";
// importar el middleware para validar los datos de las credenciales de inicio de sesion
import { validateDataLogin } from "../middleware/validateDataLogin.js";

/* crea la ruta para el servicio de login aplicando un middleware para la validacion de los datos */
export const loginRouter = Router();

/**
 * Ruta para generar la autenticacion de login.
 * - POST /
 */
loginRouter.post("/", validateDataLogin, loginService);
