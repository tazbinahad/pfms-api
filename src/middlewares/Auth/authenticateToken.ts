import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "config";

// Extend the Request interface with an optional user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!config.unauthenticatedPaths.includes(req.path)) {
    return next();
  }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    // If no token was provided, send an error response
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(
    token,
    config.accessTokenSecret as string,
    (err: any, user: any) => {
      if (err) {
        // If the token is not valid, send an error response
        return res.status(403).json({ message: "Invalid token" });
      }

      // If the token is valid, add the user to the request object and call the next middleware function
      req.user = user;
      next();
    }
  );
};
