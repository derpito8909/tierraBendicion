import { Router } from "express";
import { createItem, deleteItem, getAllItems, getItemById, updateItem, getItemByRol, changePasswordUser, updateCurrentUser, getCurrentUser } from "../controllers/controllers.js";
import { authRol } from "../middleware/auth.js";
import { validateDataUser } from "../middleware/validateDataUser.js";
import { validateDataActivity } from "../middleware/validateDataActivity.js";
import { validateDataCourse } from "../middleware/validateDataCourse.js";
import { validateDataMember } from "../middleware/validateDataMember.js";
import { validateObjectId } from "../middleware/validateDataID.js";
import { validatePasswordUser } from "../middleware/validatePasswordData.js";

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
export const createRoutesForModel = (model, routeName, app) => {
  const router = Router();
  // Selecciona el middleware de validación adecuado basado en el nombre de la ruta.
  const validateData = validationMiddlewares[routeName] || ((req, res, next) => next());
  /**
   * Ruta para crear un nuevo ítem.
   * @route POST /
   */
  router.post("/", authRol(""), validateData, createItem(model));

  /**
   * Ruta para actualizar un ítem existente por ID.
   * @route PUT /:id
   */
  router.put("/:id", authRol("pastor"), validateObjectId, updateItem(model));
  /**
   * Ruta para obtener todos los ítems.
   * @route GET /
   */
  router.get("/", authRol(""), getAllItems(model));
  /**
   * Ruta para obtener un ítem por su ID.
   * @route GET /:id
   */
  router.get("/:id", authRol(""), validateObjectId, getItemById(model));

  /**
   * Ruta para eliminar un ítem por su ID.
   * @route DELETE /:id
   */
  router.delete("/:id", authRol("pastor"), validateObjectId, deleteItem(model));

  /**
   * Ruta para obtener todos los ítems por un rol especifico
   * @route GET /:rol
   */
  router.get("/role/:rol", authRol(""), getItemByRol(model));

  /**
   * Ruta para obtener todos los ítems por un rol especifico
   * @route GET /profile/get
   */
  router.get("/profile/get", authRol(""), getCurrentUser(model));

  /**
   * Ruta actualizar la constraseña del usuario que inicio sesion
   * @route POST /profile/change-password
   */
  router.post("/profile/change-password", authRol(""), validatePasswordUser, changePasswordUser(model));

  /**
   * Ruta actualizar la informacion del usuario que tiene iniciada la sesion
   * @route PUT /profile/update/
   */
  router.put("/profile/update", authRol(""), updateCurrentUser(model));

  app.use(`/${routeName}`, router);
};
