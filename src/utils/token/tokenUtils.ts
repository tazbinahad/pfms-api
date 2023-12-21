import { config } from "config";
import jwt from "jsonwebtoken";
import { UserAttributes } from "models";

export const generateAccessToken = async (user: UserAttributes) => {
  const accessTokenSicret = config.accessTokenSecret;
  if (!accessTokenSicret) throw new Error("Access token secret not found");
  const { id, username, email } = user;
  const token = jwt.sign({ id, username, email }, accessTokenSicret, {
    expiresIn: config.accessTokenLife,
  });

  return token;
};
export const generateRefreshToken = async (user: UserAttributes) => {
  const refreshTokenSicret = config.refreshTokenSecret;
  if (!refreshTokenSicret) throw new Error("Refresh token secret not found");
  const { id, username, email } = user;
  const token = jwt.sign({ id, username, email }, refreshTokenSicret, {
    expiresIn: config.refreshTokenLife,
  });

  return token;
};
