// services/AuthService.ts

// services/AuthService.ts

import { User as UserType, User, UserAttributes } from "../../models/User/User";

class AuthService {
  static async createUser(data: Partial<UserAttributes>): Promise<UserType> {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id: number): Promise<UserType> {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(
    id: number,
    data: Partial<UserAttributes>
  ): Promise<UserType> {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error("User not found");
      await user.update(data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id: number): Promise<{ message: string }> {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error("User not found");
      await user.destroy();
      return { message: "User deleted" };
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
