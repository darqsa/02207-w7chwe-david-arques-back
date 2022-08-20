import express from "express";
import { getUsers, registerUser } from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.post("/register", registerUser);

export default usersRouter;
