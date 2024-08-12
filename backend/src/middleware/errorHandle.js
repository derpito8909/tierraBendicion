/* Este middleware se utiliza para capturar y manejar errores que ocurren 
en el ciclo de vida de una solicitud HTTP y encarga de enviar una respuesta adecuada al 
cliente cuando ocurre un error en la aplicación. */
import { CustomError } from "../lib/customErrors.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Registro del error en la consola para depuración

  if (err instanceof CustomError) {
    // Si el error es una instancia de CustomError, usa su código de estado y mensaje
    return res.status(err.statusCode).send({ message: err.message });
  }

  // Para otros tipos de errores, enviar una respuesta con el código de estado 500 y un mensaje
  res.status(500).send({ message: err.message });
};
