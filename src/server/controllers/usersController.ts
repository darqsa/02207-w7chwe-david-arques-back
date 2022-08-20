import { Request, Response } from "express";
import { IRegisterUser } from "../../types/userInterfaces";
import { createHash } from "../../utils/auth";
import User from "./models/User";

// eslint-disable-next-line import/prefer-default-export
export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({ users });
};

export const registerUser = async (req: Request, res: Response) => {
  const user: IRegisterUser = req.body;

  user.password = await createHash(user.password);
  // gestion de errores
  const newUser = await User.create(user);
  res.status(201).json({ user: newUser });
};
