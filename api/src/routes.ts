import { Router, Request, Response } from "express";

import UserController from "./controllers/user.controller";

import AuthModule from "./middlewares/auth.middleware";

const routes = Router();

//API STATUS
routes.get("/", function(req: Request, res: Response) {
  res.json({ status: "Running", version: "1.0" });
});

//USERS
routes.get("/users", AuthModule.isAuthorized, UserController.index);
routes.get("/users/:id", AuthModule.isAuthorized, UserController.find);
routes.post("/users", UserController.register);
routes.put("/users", AuthModule.isAuthorized, UserController.update);
routes.delete("/users/:id", AuthModule.isAuthorized, UserController.delete);
routes.post("/users/login", UserController.login);

export default routes;
