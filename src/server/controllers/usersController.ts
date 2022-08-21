import { NextFunction, Request, Response } from "express";
import { IUser, IUserWithID, TokenPayload } from "../../types/userInterfaces";
import { compareHash, createHash, createToken } from "../../utils/auth";
import createCustomError from "../../utils/createCustomError";
import User from "./models/User";

// eslint-disable-next-line import/prefer-default-export
export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json({ users });
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = req.body;

  const userError = createCustomError(
    403,
    "Incorrect user or password",
    Error.name
  );

  const findUser: IUserWithID[] = await User.find({
    username: user.username.toString(),
  });

  try {
    const isPassWordvalid = await compareHash(
      user.password,
      findUser[0].password
    );
    if (!isPassWordvalid) {
      userError.message = "Password Invalid";
      next(userError);
      return;
    }
  } catch (error) {
    next(userError);
    return;
  }

  const payload: TokenPayload = {
    username: findUser[0].username,
    id: findUser[0].id,
  };
  const userToken = {
    token: createToken(payload),
  };

  res.status(200).json(userToken);
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = req.body;

  user.password = await createHash(user.password);
  try {
    const newUser = await User.create(user);
    res.status(201).json({ user: newUser });
  } catch (error) {
    const customError = createCustomError(
      400,
      "Error creating user",
      error.message
    );
    next(customError);
  }
};
