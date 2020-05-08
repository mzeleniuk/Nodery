import { SecurePass } from "argon2-pass";
import express from "express";

import { UsersService } from "../../users/services/user.services";

export class AuthMiddleware {
  private static instance: AuthMiddleware;

  public static getInstance() {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }

    return AuthMiddleware.instance;
  }

  public async validateBodyRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res.status(400).send({ error: "Missing body fields: email, password" });
    }
  }

  public async verifyUserPassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userService: any = UsersService.getInstance();
    const user: any = await userService.getByEmail(req.body.email);

    if (user) {
      const sp: any = new SecurePass();
      const passwordHash: string = sp.hashPasswordSync(Buffer.from(user.password));
      const result: any = await sp.verifyHash(Buffer.from(req.body.password), passwordHash);

      if (SecurePass.isValid(result)) {
        req.body = {
          id: user.id,
          email: user.email,
          provider: "email",
          permissionLevel: user.permissionLevel
        };

        return next();
      } else {
        res.status(400).send({ errors: "Invalid email and/or password" });
      }
    } else {
      res.status(400).send({ errors: "Invalid email and/or password" });
    }
  }
}
