import express from "express";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);

export default usersRouter;
