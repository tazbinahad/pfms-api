// Author: Tazbin Ahad
// Last Modified Date: 12-12-2023

import express from "express";
import AuthController from "../../controllers/Auth/AuthController";

const AuthRoutes = express.Router();
// Define your routes
AuthRoutes.post("/users", AuthController.createUser); // Create a new user
AuthRoutes.get("/users/:id", AuthController.getUserById); // Get a user by ID
AuthRoutes.put("/users/:id", AuthController.updateUser); // Update a user by ID
AuthRoutes.delete("/users/:id", AuthController.deleteUser); // Delete a user by ID

export default AuthRoutes;
