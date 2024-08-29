import mongoose from "mongoose";
import decrypt from "bcryptjs"; // libreria para la codificacion de las contraseñas
import { ValidationError, NotFoundError, InternalServerError } from "../lib/customErrors.js"; // clases para el manejo de mensajes de error personalizados

/**
 * Obtiene todos los elementos de un modelo.
 *
 * Este método recupera todos los documentos de la colección asociada con el modelo especificado.
 * Si alguno de los campos del esquema tiene referencias a otros modelos, también se hace un `populate`
 * para obtener los datos relacionados.
 *
 * @param {mongoose.Model} model - El modelo de Mongoose que se utilizará para la búsqueda.
 * @returns {function} Middleware de Express para manejar la solicitud.
 */
export const getAllItems = (model) => async (req, res, next) => {
  try {
    const items = await model.find({});
    // se consige los campos del esquema en especifico de la ruta que se esta consumiendo
    const schemaPaths = model.schema.paths;
    let itemsWithPopulate;
    /* se hace una iteracion con los campos para verificar dinamicamente si
   un campo es de tipo referencia para traer los datos de la referencia   */
    for (let path in schemaPaths) {
      const fieldPath = schemaPaths[path];
      //fieldPath: las propiedades de de los diferentes campos del esquema
      //fieldPath.caster: La configuracion de elementos individuales del array

      if (fieldPath && fieldPath.caster && fieldPath.caster.options.ref) {
        const nameRef = fieldPath.caster.options.ref;
        itemsWithPopulate = await model.find({}).populate(nameRef);
      }
    }

    if (items.length === 0) {
      return next(new NotFoundError("registro no encontrado"));
    }
    if (itemsWithPopulate !== undefined) {
      res.status(200).send(itemsWithPopulate);
    } else {
      res.status(200).send(items);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene un elemento por su ID.
 *
 * Este método busca un documento en la colección del modelo por su ID.
 *
 * @param {mongoose.Model} model - El modelo de Mongoose que se utilizará para la búsqueda.
 * @returns {function} Middleware de Express para manejar la solicitud.
 */
export const getItemById = (model) => async (req, res, next) => {
  const { id } = req.params;
  try {
    const item = await model.findById(id);
    if (!item) {
      return next(new NotFoundError("registro no encontrado"));
    }
    res.status(200).send(item);
  } catch (error) {
    next(error);
  }
};

/**
 * Crea un nuevo elemento.
 *
 * Este método crea un nuevo documento en la colección asociada con el modelo especificado.
 * Si el esquema incluye un campo de contraseña, esta se cifra antes de guardarla.
 *
 * @param {mongoose.Model} model - El modelo de Mongoose que se utilizará para crear el nuevo documento.
 * @returns {function} Middleware de Express para manejar la solicitud.
 */
export const createItem = (model) => async (req, res, next) => {
  try {
    const item = new model(req.body);
    if (item.password !== undefined) {
      item.password = await decrypt.hash(item.password, 10);
    }
    await item.save();
    res.status(201).json({
      mensaje: "Item creado Correctamente",
      datos: item,
    });
  } catch (error) {
    // Pasa el error al middleware de manejo de errores
    if (error.name === "ValidationError") {
      return next(new ValidationError(error.message));
    } else {
      return next(new InternalServerError(error));
    }
  }
};

/**
 * Elimina un elemento por su ID.
 *
 * Este método elimina un documento en la colección del modelo por su ID.
 *
 * @param {mongoose.Model} model - El modelo de Mongoose que se utilizará para la eliminación.
 * @returns {function} Middleware de Express para manejar la solicitud.
 */
export const deleteItem = (model) => async (req, res, next) => {
  const { id } = req.params;
  try {
    const item = await model.findByIdAndDelete(id);
    if (!item) {
      return next(new NotFoundError("registro no encontrado")); // Si no se encuentra el elemento, responde con un código de estado 404 (no encontrado).
    }
    res.status(200).json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualiza un elemento por su ID.
 *
 * Este método actualiza un documento en la colección del modelo por su ID con los datos proporcionados
 * en el cuerpo de la solicitud. Si el esquema incluye un campo de contraseña, esta se cifra antes de actualizarla.
 *
 * @param {mongoose.Model} model - El modelo de Mongoose que se utilizará para la actualización.
 * @returns {function} Middleware de Express para manejar la solicitud.
 */
export const updateItem = (model) => async (req, res, next) => {
  const { id } = req.params; // Obtiene el ID de los parámetros de la URL.
  try {
    const item = await model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }); // Actualiza el elemento por su ID con los datos del cuerpo de la solicitud.

    if (!item) {
      return next(new NotFoundError("registro no encontrado")); // Si no se encuentra el elemento, responde con un código de estado 404 (no encontrado).
    }
    res.status(200).json({
      mensaje: "Item actualizado correctamente",
      datos: item,
    }); // Responde con un código de estado 200 (OK) y envía el elemento actualizado.
  } catch (error) {
    // Pasa el error al middleware de manejo de errores
    if (error.name === "ValidationError") {
      return next(new ValidationError(error.message));
    } else {
      return next(new InternalServerError(`Error al actualizar el registro: ${error.message}`));
    }
  }
};
