import express from "express";
import { UsersService } from "../services/user.services";

export class UsersMiddleware {
  private static instance: UsersMiddleware;

  public static getInstance(): any {
    if (!UsersMiddleware.instance) {
      UsersMiddleware.instance = new UsersMiddleware();
    }

    return UsersMiddleware.instance;
  }

  public validateRequiredCreateUserBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res.status(400).send({ error: "Missing required fields: email and password" });
    }
  }

  public async validateSameEmailDoesNotExist(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userService: any = UsersService.getInstance();
    const user: any = await userService.getByEmail(req.body.email);

    if (user) {
      res.status(400).send({ error: "User email already exists" });
    } else {
      next();
    }
  }

  public async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userService: any = UsersService.getInstance();
    const user: any = await userService.readById(req.params.id);

    if (user) {
      next();
    } else {
      res.status(404).send({ error: `User ${req.params.id} not found` });
    }
  }

  public async extractUserId(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body.id = req.params.id;
    next();
  }
}
