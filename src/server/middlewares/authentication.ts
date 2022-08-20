import { NextFunction, Response } from "express";
import { CustomRequest, TokenPayload } from "../../types/userInterfaces";
import { verifyToken } from "../../utils/auth";
import createCustomError from "../../utils/createCustomError";

const authentication = (
  req: CustomRequest,
  _res: Response,
  next: NextFunction
) => {
  const dataAuthentication = req.get("Authorization");

  const error = createCustomError(400, "Authentication error", Error.name);

  if (!dataAuthentication || !dataAuthentication.startsWith("Bearer ")) {
    next(error);
    return;
  }
  const token = dataAuthentication.slice(7);

  const tokenData = verifyToken(token);
  if (typeof tokenData === "string") {
    next(error);
    return;
  }

  req.payload = tokenData as TokenPayload;
  next();
};
export default authentication;
