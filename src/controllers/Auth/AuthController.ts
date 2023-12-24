// Author: Tazbin Ahad
// Last Modified Date: 12-12-2023

import { NextFunction, Request, Response } from "express";
import { UserAttributes } from "models";
import { AuthService } from "services";

class AuthController {
  // Controller: Create a new user
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user: UserAttributes = await AuthService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: unknown) {
      next(error);
    }
  }
  // Controller: Get a user by ID
  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);
      const user = await AuthService.getUserById(userId);
      res.json(user);
    } catch (error: unknown) {
      next(error);
    }
  }
  // Controller: Update a user by ID
  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);
      const user = await AuthService.updateUser(userId, req.body);
      res.json(user);
    } catch (error: unknown) {
      next(error);
    }
  }
  // Controller: Delete a user by ID
  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);
      await AuthService.deleteUser(userId);
      res.json({ message: "User deleted" });
    } catch (error: unknown) {
      next(error);
    }
  }
  // Controller: Login a user
  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.loginUser({
        login: req.body.login,
        password: req.body.password,
      });
      res.json(user);
    } catch (error: unknown) {
      next(error);
    }
  }
  // Controller: Refresh access token
  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const user = await AuthService.refreshAccessToken(refreshToken);
      res.json(user);
    } catch (error: unknown) {
      next(error);
    }
  }
  // Controller: Create a role
  static async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await AuthService.createRole(req.body);
      res.status(201).json(role);
    } catch (error: unknown) {
      next(error);
    }
  }
  // Controller: Get a role by ID
  static async getRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId = Number(req.params.id);
      const role = await AuthService.getRole(roleId);
      res.json(role);
    } catch (error: unknown) {
      next(error);
    }
  }
  // Controller: Update a role by ID
  static async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId = Number(req.params.id);
      const role = await AuthService.updateRole(roleId, req.body);
      res.json(role);
    } catch (error: unknown) {
      next(error);
    }
  }
  // Controller: Delete a role by ID
  static async deleteRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId = Number(req.params.id);
      await AuthService.deleteRole(roleId);
      res.json({ message: "Role deleted" });
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default AuthController;
