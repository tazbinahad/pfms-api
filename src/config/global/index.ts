// Author: Tazbin Ahad
// Last Modified Date: 12-12-2023

import sequelize from "./database";

const unauthenticatedPaths = ["/api/auth/login"];

export const config = {
  port: process.env.PORT || 3000,
  database: sequelize,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenLife: process.env.ACCESS_TOKEN_LIFE,
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE,
  unauthenticatedPaths,
};
