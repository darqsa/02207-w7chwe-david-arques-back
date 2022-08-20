import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "./models/User";
import { getUsers, registerUser } from "./usersController";
import createCustomError from "../../utils/createCustomError";

describe("Given a getUsers function", () => {
  describe("When it receives a response", () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call status function with 200", async () => {
      const expectedStatus = 200;

      User.find = jest.fn().mockResolvedValue([]);
      await getUsers(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    describe("And Users.find() returns a list with Hola and Adios", () => {
      test("Then it should call the json method with the list with Hola and Adios", async () => {
        const users = ["Hola", "Adios"];

        User.find = jest.fn().mockResolvedValue(users);

        await getUsers(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith({ users });
      });
    });
  });
});

describe("Given a registerUser function", () => {
  const fakeUser = {
    nickName: "bob esponja",
    password: "a",
  };

  const req: Partial<Request> = { body: fakeUser };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: Partial<NextFunction> = jest.fn();
  describe("When it receives a response and a fake user", () => {
    const bcryptHashTest = jest.fn().mockResolvedValue("test");
    (bcrypt.hash as jest.Mock) = bcryptHashTest;

    test("Then it should call status function with code 201", async () => {
      const expectedStatus = 201;
      User.create = jest.fn().mockResolvedValue(fakeUser);

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should invoke the response method json with a new User", async () => {
      User.create = jest.fn().mockResolvedValue(fakeUser);

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(res.json).toHaveBeenCalledWith({ user: fakeUser });
    });
  });

  describe("When it receives a response and a wrong fake user", () => {
    test("Then it should call the next function and throw a customError", async () => {
      const customError = createCustomError(400, "", "");
      User.create = jest.fn().mockRejectedValue(customError);

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
