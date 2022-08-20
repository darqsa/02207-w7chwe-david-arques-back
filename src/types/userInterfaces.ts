import { Request } from "express";

export interface IUser {
  username: string;
  password: string;
}
export interface IUserWithID extends IUser {
  id: string;
}

export interface TokenPayload {
  username: string;
  id: string;
}

export interface CustomRequest extends Request {
  payload: TokenPayload;
}
