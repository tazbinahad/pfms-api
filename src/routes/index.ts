// Author: Tazbin Ahad
// Last Modified Date: 12-12-2023

import express from "express";
import AuthRoutes from "./Auth/Auth";

const router = express.Router();
// Define your routes
router.use("/auth", AuthRoutes);

export default router;
