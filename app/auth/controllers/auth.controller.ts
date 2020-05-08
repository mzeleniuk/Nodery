import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const jwtSecret: string = "secret|token";
const tokenExpirationInSeconds: number = 3600;

export class AuthController {
  constructor() { }

  public async createJWT(req: express.Request, res: express.Response) {
    try {
      const refreshId: string = req.body.id + jwtSecret;
      const salt: string = crypto.randomBytes(16).toString("base64");
      const hash: string = crypto.createHmac("sha512", salt).update(refreshId).digest("base64");

      req.body.refreshKey = salt;

      const token: string = jwt.sign(req.body, jwtSecret, { expiresIn: tokenExpirationInSeconds });
      const buffer: any = Buffer.from(hash);
      const refreshToken: string = buffer.toString("base64");

      return res.status(201).send({ accessToken: token, refreshToken: refreshToken });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}
