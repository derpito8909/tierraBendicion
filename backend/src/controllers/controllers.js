import mongoose from "mongoose";
import decrypt from "bcryptjs"; // libreria para la codificacion de las contraseñas
import { ValidationError, NotFoundError, InternalServerError } from "../lib/customErrors.js"; // clases para el manejo de mensajes de error personalizados

export const getAllItems = (model) => async (req, res, next) => {
  try {
    const items = await model.find({});
    if (items.length === 0) {
      return next(new NotFoundError("registro no encontrado"));
    }
    res.status(200).send(items);
  } catch (error) {
    next(error);
  }
};

export const getItemById = (model) => async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ValidationError("Digite un id correcto"));
    }
    const item = await model.findById(id);
    if (!item) {
      return next(new NotFoundError("registro no encontrado"));
    }
    res.status(200).send(item);
  } catch (error) {
    next(error);
  }
};

export const createItem = (model) => async (req, res, next) => {
  try {
    const item = new model(req.body); // Crea una nueva instancia del modelo con los datos del cuerpo de la solicitud
    if (item.password !== undefined) {
      item.password = await decrypt.hash(item.password, 10);
    }
    await item.save(); // Guarda el nuevo elemento en la base de datos.
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

export const deleteItem = (model) => async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ValidationError("Digite un id correcto"));
    }
    const item = await model.findByIdAndDelete(id);
    if (!item) {
      return next(new NotFoundError("registro no encontrado")); // Si no se encuentra el elemento, responde con un código de estado 404 (no encontrado).
    }
    res.status(200).json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

export const updateItem = (model) => async (req, res, next) => {
  const { id } = req.params; // Obtiene el ID de los parámetros de la URL.
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ValidationError("Digite un id correcto"));
    }

    if (item.password !== undefined) {
      item.password = await decrypt.hash(item.password, 10);
    }
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
      return next(new InternalServerError("Error al actualizar el registro"));
    }
  }
};
