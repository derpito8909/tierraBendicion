/* Archivo que recibe la ruta de la peticion y la redirige al controlador del modelo enviado */
import { Router } from "express";
import { createItem, deleteItem, getAllItems, getItemById, updateItem } from "../controllers/controllers.js";
//importar el middelware de autorizacion
import { authRol } from "../middleware/auth.js";

/**
 * funcion para saber de que ruta y que modelo se hace la peticion y asi hacer
 * uso de la logica corespondiente en el controlador controlador
 * @param {model } String - cadena de caracteres con el valor del modelo a utilizar
 * @param {routeName } String - cadena de caracteres con el valor de la ruta utilizada
 * @param {app } Object - objeto de la configuracion de servidor express iniciado
 * @param {admin } Boolean - parametro opcional donde true es que la ruta necesita permisios de administrador y false, solo necsita iniciar sesion
 * @returns {void} ejecuta el controlador necesario de acuerdo a la ruta especificada
 */
export const createRoutesForModel = (model, routeName, app, admin = false) => {
  const router = Router();

  router.post("/", createItem(model));
  router.get("/", getAllItems(model));
  router.get("/:id", getItemById(model));
  router.put("/:id", updateItem(model));
  router.delete("/:id", deleteItem(model));
  if (admin) {
    app.use(`/${routeName}`, authRol("pastor"), router); // Asocia el router con la ruta base especificada.
  } else {
    app.use(`/${routeName}`, authRol(""), router); // Asocia el router con la ruta base especificada.
  }
};
