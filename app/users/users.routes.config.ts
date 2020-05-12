import express from "express";

import { UsersController } from "./controllers/users.controller";
import { UsersMiddleware } from "./middlewares/users.middleware";
import { JwtMiddleware } from "../auth/middlewares/jwt.middleware";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { configureRoutes } from "../common/interfaces";
import { CommonPermissionMiddleware } from "../common/middlewares/common.permission.middleware";

export class UsersRoutes extends CommonRoutesConfig implements configureRoutes {
  constructor(app: express.Application) {
    super(app, "Users Route");
    this.configureRoutes();
  }

  private configureRoutes(): void {
    const usersController: any = new UsersController();
    const usersMiddleware: any = UsersMiddleware.getInstance();
    const jwtMiddleware: any = JwtMiddleware.getInstance();
    const commonPermissionMiddleware: any = new CommonPermissionMiddleware();

    this.app.get("/users", [
      jwtMiddleware.validJWTNeeded,
      commonPermissionMiddleware.onlyAdminCanDoThisAction,
      usersController.index
    ]);

    this.app.get("/users/:id", [
      jwtMiddleware.validJWTNeeded,
      commonPermissionMiddleware.minimumPermissionLevelRequired(CommonPermissionMiddleware.BASIC_PERMISSION),
      commonPermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
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
      jwtMiddleware.validJWTNeeded,
      commonPermissionMiddleware.minimumPermissionLevelRequired(CommonPermissionMiddleware.BASIC_PERMISSION),
      commonPermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.put
    ]);

    this.app.patch("/users/:id", [
      jwtMiddleware.validJWTNeeded,
      commonPermissionMiddleware.minimumPermissionLevelRequired(CommonPermissionMiddleware.BASIC_PERMISSION),
      commonPermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.patch
    ]);

    this.app.delete("/users/:id", [
      jwtMiddleware.validJWTNeeded,
      commonPermissionMiddleware.minimumPermissionLevelRequired(CommonPermissionMiddleware.BASIC_PERMISSION),
      commonPermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.delete
    ]);
  }
}
