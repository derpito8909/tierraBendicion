/*
  archivo donde se implementa las funciones asociadas en el procesos de autenticacion
  */
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";

/**
 * funcion para verificar la existencia de un usuario por correo
 * @param {email} string - cadena de caracteres con el nombre del email del usuario.
 * @returns {userModel} objecto  del modelo de usuario con los datos del usuario encontrado
 */
export const findUserByEmail = async (email) => {
  return await userModel.findOne({ email: email });
};

/**
 * funcion para validar y comparar contraseña digitada con la de la base de datos
 * @param {inputPassword } string - cadena de caracteres con el valor de la contraseña digitada por el usuario
 * @param {storedPassword } string - cadena de caracteres con el valor de la contraseña obtenida en la base de datos
 * @returns {Boolean} boolean con el valor true si las contraseñas con validas, de lo contrario false
 */

export const validatePassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

/**
 * funcion para crear el payload necesario para adjuntarlo al token JWT
 * @param {user } Object - Objecto con el modelo del usuario
 * @returns {Object} Objecto con el valor del payload con los datos del id, nombre y si tiene un categoria de administrador
 */
export const createPayload = (user) => {
  const payload = {
    id: user._id,
    name: user.nombreCompleto,
  };

  if (user.category === "lider") {
    payload.isLeader = true;
  }

  if (user.category === "pastor") {
    payload.isAdmin = true;
  }

  return payload;
};
