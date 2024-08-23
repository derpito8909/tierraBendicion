/* Archivo para definir un platilla para manejar tipo de errores personalizados
que extiende de la clase nativa Error de javascript y que permite crear errores
 con códigos de estado HTTP específicos y mensajes personalizados.  */

export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ValidationError extends CustomError {
  constructor(message) {
    super(message, 403);
  }
}

export class NotFoundError extends CustomError {
  constructor(message) {
    super(message, 404);
  }
}

export class InternalServerError extends CustomError {
  constructor(message) {
    super(message, 500);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message) {
    super(message, 403);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message, 401);
  }
}
