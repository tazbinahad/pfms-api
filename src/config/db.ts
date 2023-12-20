// db.ts
import { Sequelize } from "sequelize";
import tedious from "tedious";
const sequelize = new Sequelize("PFMS", "tazbin", "1234", {
  host: "TAZBIN",
  dialect: "mssql",
});
export default sequelize;
