import bcrypt from "bcryptjs";
import "../loadEnv";

// eslint-disable-next-line import/prefer-default-export
export const createHash = (text: string) => {
  const salt = 10;
  return bcrypt.hash(text, salt);
};
