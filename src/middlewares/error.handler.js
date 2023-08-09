import { ValidationError } from "sequelize";

export const logErrors = (err, req, res, next) => {
  // console.error(err);
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    // stack: err.stack,
  });
};

export const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    const { payload, statusCode } = output;
    res.status(statusCode).json({
      success: false,
      data: [],
      message: payload.message,
      count: 0,
    });
  }
  next(err);
};

export const ormErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      success: false,
      data: [],
      message: {
        name: err.name,
        errors: err.errors,
      },
      count: 0,
    });
  }

  next(err);
};
