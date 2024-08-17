import { Router } from "express";
import { createItem, deleteItem, getAllItems, getItemById, updateItem } from "../controllers/controllers.js";
import { authRol } from "../middleware/auth.js";
import { validateDataUser } from "../middleware/validateDataUser.js";
import { validateDataActivity } from "../middleware/validateDataActivity.js";
import { validateDataCourse } from "../middleware/validateDataCourse.js";
import { validateDataMember } from "../middleware/validateDataMember.js";
import { validateObjectId } from "../middleware/validateDataID.js";

/**
 * Mapeo de nombres de ruta a middlewares de validación.
 *
 * Este objeto asocia los nombres de ruta a los middlewares de validación
 * específicos para cada modelo.
 *
 * @type {Object.<string, function>}
 */
const validationMiddlewares = {
  users: validateDataUser,
  teachers: validateDataUser,
  members: validateDataMember,
  courses: validateDataCourse,
  activities: validateDataActivity,
};
/**
 * Crea rutas para un modelo específico y las agrega a la aplicación.
 *
 * Este método genera rutas CRUD para un modelo de Mongoose y las asocia
 * a un nombre de ruta específico. Además, permite aplicar middlewares de
 * validación y autenticación basados en roles.
 *
 * @function
 * @name createRoutesForModel
 * @param {mongoose.Model} model - El modelo de Mongoose para el cual se crean las rutas.
 * @param {string} routeName - El nombre de la ruta bajo la cual se expondrán los endpoints.
 * @param {express.Application} app - La instancia de la aplicación Express.
 * @param {boolean} [admin=false] - Si es `true`, se requiere el rol "pastor" para acceder a las rutas.
 *
 * @returns {void} - Esta función no devuelve ningún valor, sino que registra las rutas en la aplicación Express.
 *
 * @example
 * // Crear rutas para el modelo de usuarios bajo la ruta "/users"
 * createRoutesForModel(UserModel, "users", app);
 */
export const createRoutesForModel = (model, routeName, app, admin = false) => {
  const router = Router();
  // Selecciona el middleware de validación adecuado basado en el nombre de la ruta.
  const validateData = validationMiddlewares[routeName] || ((req, res, next) => next());

  /**
   * Ruta para crear un nuevo ítem.
   * @route POST /
   */
  router.post("/", validateData, createItem(model));
  /**
   * Ruta para actualizar un ítem existente por ID.
   * @route PUT /:id
   */
  router.put("/:id", validateObjectId, validateData, updateItem(model));
  /**
   * Ruta para obtener todos los ítems.
   * @route GET /
   */
  router.get("/", getAllItems(model));
  /**
   * Ruta para obtener un ítem por su ID.
   * @route GET /:id
   */
  router.get("/:id", validateObjectId, getItemById(model));
  /**
   * Ruta para eliminar un ítem por su ID.
   * @route DELETE /:id
   */
  router.delete("/:id", validateObjectId, deleteItem(model));

  // Define el rol necesario para acceder a las rutas si se requiere autenticación basada en roles.
  const role = admin ? "pastor" : "";
  app.use(`/${routeName}`, authRol(role), router);
};
