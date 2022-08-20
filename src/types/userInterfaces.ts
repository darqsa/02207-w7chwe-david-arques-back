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
