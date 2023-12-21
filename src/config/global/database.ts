// Author: Tazbin Ahad
// Created Date: 12-12-2023
// Last Modified Date: 20-12-2023

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// use dotenv to get environment variables
dotenv.config();

// get database configuration from environment variables
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

// check if database configuration variables are missing
if (!dbName || !dbUser || !dbPassword || !dbHost) {
  throw new Error("Database configuration variables are missing");
}

// create sequelize instance
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "mssql",
});

export default sequelize;
