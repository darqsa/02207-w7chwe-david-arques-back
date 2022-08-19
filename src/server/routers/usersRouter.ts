import express from "express";
import { getUsers } from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);

export default usersRouter;
