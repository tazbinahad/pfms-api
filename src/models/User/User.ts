// Author: Tazbin Ahad
// Last Modified Date: 12-12-2023

import { config } from "config";
import { DataTypes, Model, Sequelize } from "sequelize";

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
// Define the User class that extends the Sequelize Model
// This class represents the User table in the database
class User extends Model implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

// Initialize the User model with its attributes and options
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize: config.database,
    modelName: "User",
    tableName: "Users",
    timestamps: false,
    schema: "auth",
  }
);

export { User, UserAttributes };
