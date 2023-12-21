// Author: Tazbin Ahad
// Last Modified Date: 12-12-2023
import express from "express";
import AuthController from "../../controllers/Auth/AuthController";
import { validateRequestBody } from "middlewares";
import { CreateUserSchema, LoginUserSchema } from "schemas";

const AuthRoutes = express.Router();
/* =========== Routes: Auth/users =========== */
// Create a user
AuthRoutes.post(
  "/users",
  validateRequestBody(CreateUserSchema),
  AuthController.createUser
);
// Get User by ID
AuthRoutes.get("/users/:id", AuthController.getUserById);
// Update a user by ID
AuthRoutes.put("/users/:id", AuthController.updateUser);
// Delete a user by ID
AuthRoutes.delete("/users/:id", AuthController.deleteUser);
/* =========== Routes: Auth/login =========== */
// Login user
AuthRoutes.post(
  "/login",
  validateRequestBody(LoginUserSchema),
  AuthController.loginUser
);

export { AuthRoutes };
