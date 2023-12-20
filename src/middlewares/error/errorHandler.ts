import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.status || 500);

  if (process.env.NODE_ENV === "production") {
    res.json({
      message: err.message,
      // You might want to log the error details somewhere, like a logging service or a log file
    });
  } else {
    res.json({
      message: err.message,
      error: err,
    });
  }
}
