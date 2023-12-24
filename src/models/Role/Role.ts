import { DataTypes, Model } from "sequelize";
import { config } from "config";

// Define the attributes for the Role model
interface RoleAttributes {
  id: number;
  name: string;
}

// Define the Role class that extends the Sequelize Model
// This class represents the Role table in the database
class Role extends Model implements RoleAttributes {
  public id!: number;
  public name!: string;
}

// Initialize the Role model with its attributes and options
Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: config.database,
    modelName: "Role",
    tableName: "Roles",
    timestamps: false,
    schema: "auth",
  }
);

export { Role, RoleAttributes };
