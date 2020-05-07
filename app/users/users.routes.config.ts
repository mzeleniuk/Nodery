import express from "express";
import { CommonRoutesConfig, configureRoutes } from "../common/common.routes.config";
import { UsersController } from "./controllers/users.controller";

export class UsersRoutes extends CommonRoutesConfig implements configureRoutes {
  constructor(app: express.Application) {
    super(app, "Users Route");
    this.configureRoutes();
  }

  private configureRoutes(): void {
    const usersController = new UsersController();

    this.app.get("/users", [usersController.index]);
    this.app.get("/users/:id", [usersController.get]);
    this.app.post("/users", [usersController.create]);
    this.app.put("/users/:id", [usersController.put]);
    this.app.patch("/users/:id", [usersController.patch]);
    this.app.delete("/users/:id", [usersController.delete]);
  }
}
