// Author: Tazbin Ahad
// Last Modified Date: 12-12-2023

import express from "express";
import router from "./routes";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../api-docs.json";
import errorHandler from "./middlewares/error/errorHandler";
import globalConfig from "./config/global";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

const port = globalConfig.port;
app.listen(globalConfig.port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
