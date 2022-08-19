import { Request, Response } from "express";
import User from "./models/User";

// eslint-disable-next-line import/prefer-default-export
export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({ users });
};
