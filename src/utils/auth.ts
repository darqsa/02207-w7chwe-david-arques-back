import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "../loadEnv";
import { TokenPayload } from "../types/userInterfaces";

export const compareHash = (text: string, hash: string) =>
  bcrypt.compare(text, hash);

export const createToken = (payload: TokenPayload) =>
  jwt.sign(payload, process.env.SECRET);

export const createHash = (text: string) => {
  const salt = 10;
  return bcrypt.hash(text, salt);
};
