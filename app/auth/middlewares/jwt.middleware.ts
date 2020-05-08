import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const jwtSecret: string = "secret|token";

export class JwtMiddleware {
  private static instance: JwtMiddleware;

  public static getInstance(): any {
    if (!JwtMiddleware.instance) {
      JwtMiddleware.instance = new JwtMiddleware();
    }

    return JwtMiddleware.instance;
  }

  public verifyRefreshBodyField(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body && req.body.refreshToken) {
      return next();
    } else {
      return res.status(400).send({ error: "Need body field: refreshToken" });
    }
  }

  public validRefreshNeeded(req: any, res: express.Response, next: express.NextFunction) {
    const refreshToken: string = Buffer.from(req.body.refreshToken, "base64").toString();
    const hash: string = crypto.createHmac("sha512", req.jwt.refreshKey).update(req.jwt.id + jwtSecret).digest("base64");

    if (hash === refreshToken) {
      delete req.jwt.iat;
      delete req.jwt.exp;

      req.body = req.jwt;
      return next();
    } else {
      return res.status(400).send({ error: "Invalid refresh token" });
    }
  }

  public validJWTNeeded(req: any, res: express.Response, next: express.NextFunction) {
    if (req.headers["authorization"]) {
      try {
        let authorization: string = req.headers["authorization"].split(" ");

        if (authorization[0] !== "Bearer") {
          return res.status(401).send();
        } else {
          req.jwt = jwt.verify(authorization[1], jwtSecret);
          next();
        }
      } catch (err) {
        return res.status(403).send();
      }
    } else {
      return res.status(401).send();
    }
  }
}
