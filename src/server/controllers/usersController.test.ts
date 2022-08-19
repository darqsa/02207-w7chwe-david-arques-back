import { Request, Response } from "express";
import User from "./models/User";
import { getUsers } from "./usersController";

describe("Given a getUsers controller", () => {
  describe("When it recives a response", () => {
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
