import { config } from "config";
import jwt from "jsonwebtoken";

export const generateAccessToken = async (id: number) => {
  const accessTokenSicret = config.accessTokenSecret;
  if (!accessTokenSicret) throw new Error("Access token secret not found");

  const token = jwt.sign({ id }, accessTokenSicret, {
    expiresIn: "15m",
  });

  return token;
};
export const generateRefreshToken = async (id: number) => {
  const refreshTokenSicret = config.refreshTokenSecret;
  if (!refreshTokenSicret) throw new Error("Refresh token secret not found");

  const token = jwt.sign({ id }, refreshTokenSicret, {
    expiresIn: "7d",
  });

  return token;
};
