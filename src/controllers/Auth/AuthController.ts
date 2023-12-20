// Author: Tazbin Ahad
// Last Modified Date: 12-12-2023

import { Request, Response } from "express";
import { UserAttributes } from "../../models/User/User";
import AuthService from "../../services/Auth/AuthService";

class AuthController {
  static async createUser(req: Request, res: Response) {
    try {
      const user: UserAttributes = await AuthService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const user = await AuthService.getUserById(userId);
      res.json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const user = await AuthService.updateUser(userId, req.body);
      res.json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      await AuthService.deleteUser(userId);
      res.json({ message: "User deleted" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }
}

export default AuthController;
