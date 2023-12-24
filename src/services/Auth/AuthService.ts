// services/AuthService.ts

import bycrypt from "bcryptjs";
import {
  Role,
  RoleAttributes,
  User,
  UserAttributes,
  User as UserType,
} from "models";
import {
  ApplicationError,
  generateAccessToken,
  generateRefreshToken,
} from "utils";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import {
  CreateUserSchemaType,
  LoginUserSchemaType,
  RoleSchemaType,
} from "schemas";
export class AuthService {
  // Service: User Create
  static async createUser(data: CreateUserSchemaType): Promise<UserType> {
    try {
      const salt = await bycrypt.genSalt(10);
      const hashedPassword = await bycrypt.hash(data.password, salt);
      const user = await User.create({ ...data, password: hashedPassword });
      return user;
    } catch (error) {
      throw error;
    }
  }
  // Service: Get User By user id
  static async getUserById(id: number): Promise<UserType> {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new ApplicationError("User not found", 404);
      return user;
    } catch (error) {
      throw error;
    }
  }
  // Service: Update User by id
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
  // Service: Delete User by id
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
  // Service: Login User by email and password and return access token and refresh token
  static async loginUser({ login, password }: LoginUserSchemaType): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [{ email: login }, { username: login }],
        },
      });
      if (!user) throw new Error("User not found");

      const isPasswordValid = await bycrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error("Invalid password");

      const accessToken = await generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);
      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
  // Service: Refresh access token by refresh token
  static async refreshAccessToken(
    refreshToken: string
  ): Promise<{ accessToken: string }> {
    try {
      const refreshTokenSicret = process.env.REFRESH_TOKEN_SECRET;
      if (!refreshTokenSicret)
        throw new Error("Refresh token secret not found");

      const payload = jwt.verify(refreshToken, refreshTokenSicret) as {
        id: number;
      };
      const user = await User.findByPk(payload.id);
      if (!user) throw new Error("Invalid user");

      const accessToken = await generateAccessToken(user);

      return { accessToken };
    } catch (error) {
      throw error;
    }
  }
  // Service: Create a role
  static async createRole({ name }: RoleSchemaType): Promise<RoleAttributes> {
    try {
      const role = await Role.create({ name });
      return role;
    } catch (error) {
      throw error;
    }
  }
  // Service: Get a role by id
  static async getRole(id: number): Promise<RoleAttributes> {
    try {
      const role = await Role.findByPk(id);
      if (!role) throw new Error("Role not found");
      return role;
    } catch (error) {
      throw error;
    }
  }
  // Service: Update a role by id
  static async updateRole(
    id: number,
    data: Partial<RoleAttributes>
  ): Promise<RoleAttributes> {
    try {
      const role = await Role.findByPk(id);
      if (!role) throw new Error("Role not found");
      await role.update(data);
      return role;
    } catch (error) {
      throw error;
    }
  }
  // Service: Delete a role by id
  static async deleteRole(id: number): Promise<{ message: string }> {
    try {
      const role = await Role.findByPk(id);
      if (!role) throw new Error("Role not found");
      await role.destroy();
      return { message: "Role deleted" };
    } catch (error) {
      throw error;
    }
  }
}
