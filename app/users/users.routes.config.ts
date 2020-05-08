import express from "express";

import { UsersController } from "./controllers/users.controller";
import { UsersMiddleware } from "./middlewares/users.middleware";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { configureRoutes } from "../common/interfaces";

export class UsersRoutes extends CommonRoutesConfig implements configureRoutes {
  constructor(app: express.Application) {
    super(app, "Users Route");
    this.configureRoutes();
  }

  private configureRoutes(): void {
    const usersController: any = new UsersController();
    const usersMiddleware: any = UsersMiddleware.getInstance();

    this.app.get("/users", [usersController.index]);

    this.app.get("/users/:id", [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.get
    ]);

    this.app.post("/users", [
      usersMiddleware.validateRequiredCreateUserBodyFields,
      usersMiddleware.validateSameEmailDoesNotExist,
      usersController.create
    ]);

    this.app.put("/users/:id", [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.put
    ]);

    this.app.patch("/users/:id", [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.patch
    ]);

    this.app.delete("/users/:id", [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.delete
    ]);
  }
}
