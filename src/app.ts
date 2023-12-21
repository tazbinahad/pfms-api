// Author: Tazbin Ahad
// Last Modified Date: 12-12-2023

import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../api-docs.json";
import { authenticateToken, errorHandler } from "middlewares";
import { config } from "config";
import routes from "routes";

dotenv.config();
const app = express();

app.use(express.json());

// Token authentication middleware
app.use(authenticateToken);

app.use("/api", routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

const port = config.port;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
