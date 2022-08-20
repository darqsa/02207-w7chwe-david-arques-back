import express from "express";
import {
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.post("/login", loginUser);
usersRouter.post("/register", registerUser);

export default usersRouter;
