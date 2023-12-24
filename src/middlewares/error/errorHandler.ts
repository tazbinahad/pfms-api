import { NextFunction, Request, Response } from "express";
import {
  ValidationError,
  DatabaseError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  ExclusionConstraintError,
  TimeoutError,
  ConnectionError,
  ConnectionRefusedError,
  AccessDeniedError,
  HostNotFoundError,
  HostNotReachableError,
  InvalidConnectionError,
  ConnectionTimedOutError,
} from "sequelize";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "An unexpected error occurred";
  let errorDetails = err?.errorDetails;

  // Handle Sequelize ValidationError
  if (err instanceof ValidationError) {
    statusCode = 400;
    message = err.errors.map((error: any) => error.message).join(", ");
  }
  // Handle Sequelize DatabaseError
  else if (err instanceof DatabaseError) {
    statusCode = 500;
    message = "Database error";
  }
  // Handle Sequelize UniqueConstraintError
  else if (err instanceof UniqueConstraintError) {
    statusCode = 409;
    message = "Duplicate entry not allowed";
  }
  // Handle Sequelize ForeignKeyConstraintError
  else if (err instanceof ForeignKeyConstraintError) {
    statusCode = 409;
    message = "Foreign key constraint error";
  }
  // Handle Sequelize ExclusionConstraintError
  else if (err instanceof ExclusionConstraintError) {
    statusCode = 409;
    message = "Exclusion constraint error";
  }
  // Handle Sequelize TimeoutError
  else if (err instanceof TimeoutError) {
    statusCode = 408;
    message = "Database operation timed out";
  }
  // Handle Sequelize connection-related errors
  else if (
    err instanceof ConnectionError ||
    err instanceof ConnectionRefusedError ||
    err instanceof AccessDeniedError ||
    err instanceof HostNotFoundError ||
    err instanceof HostNotReachableError ||
    err instanceof InvalidConnectionError ||
    err instanceof ConnectionTimedOutError
  ) {
    statusCode = 500;
    message = "Database connection error";
  }
  // Handle errors with a statusCode property
  else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // Send Status Code
  res.status(statusCode);

  if (process.env.NODE_ENV === "production") {
    res.json({
      message: message,
      statusCode: err.statusCode,
    });
  } else {
    res.json({
      message: message,
      statusCode: err.statusCode,
      error: errorDetails,
    });
  }
}
