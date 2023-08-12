const { ValidationError, DatabaseError } = require("sequelize");

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    const { payload, statusCode } = output;
    res.status(statusCode).json({
      success: false,
      data: [],
      message: payload.message,
      count: 0,
    });
  } else {
    next(err);
  }
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof DatabaseError) {
    res.status(500).json({
      success: false,
      data: [],
      message: {
        name: err.name,
        errors: err,
        msg: "Error de base de datos",
      },
      count: 0,
    });
  } else if (err instanceof ValidationError) {
    res.status(409).json({
      success: false,
      data: [],
      message: {
        name: err.name,
        errors: err.errors,
      },
      count: 0,
    });
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
