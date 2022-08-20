/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../types/errorInterfaces";

export const notFoundError = (req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {};
