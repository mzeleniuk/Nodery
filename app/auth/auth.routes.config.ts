import express from "express";

import { AuthController } from "./controllers/auth.controller";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { JwtMiddleware } from "./middlewares/jwt.middleware";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { configureRoutes } from "../common/interfaces";

export class AuthRoutes extends CommonRoutesConfig implements configureRoutes {
  constructor(app: express.Application) {
    super(app, "Auth Route");
    this.configureRoutes();
  }

  private configureRoutes(): void {
    const usersController: any = new AuthController();
    const authMiddleware: any = AuthMiddleware.getInstance();
    const jwtMiddleware: any = JwtMiddleware.getInstance();

    this.app.post("/auth", [
      authMiddleware.validateBodyRequest,
      authMiddleware.verifyUserPassword,
      usersController.createJWT
    ]);

    this.app.post("/auth/refresh-token", [
      jwtMiddleware.validJWTNeeded,
      jwtMiddleware.verifyRefreshBodyField,
      jwtMiddleware.validRefreshNeeded,
      usersController.createJWT
    ]);
  }
}
