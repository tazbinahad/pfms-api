// Author: Tazbin Ahad
// Last Modified Date: 12-12-2023

import express from "express";
import { AuthRoutes } from "./Auth/Auth";

const routes = express.Router();
// Define your routes
routes.use("/auth", AuthRoutes);

export default routes;
