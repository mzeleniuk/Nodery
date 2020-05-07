import express from "express";
import { CommonRoutesConfig, configureRoutes } from "../common/common.routes.config";

export class UsersRoutes extends CommonRoutesConfig implements configureRoutes {
  constructor(app: express.Application) {
    super(app, "UsersRoute");
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.app.get("/users", (req: express.Request, res: express.Response) => {
      res.status(200).send("List of users");
    });

    this.app.post("/users", (req: express.Request, res: express.Response) => {
      res.status(200).send("Post to users");
    });

    this.app.put("/users/:id", (req: express.Request, res: express.Response) => {
      res.status(200).send(`Put to ${req.params.id}`);
    });

    this.app.patch("/users/:id", (req: express.Request, res: express.Response) => {
      res.status(200).send(`Patch to ${req.params.id}`);
    });

    this.app.delete("/users/:id", (req: express.Request, res: express.Response) => {
      res.status(200).send(`Delete to ${req.params.id}`);
    });

    this.app.get("/users/:id", (req: express.Request, res: express.Response) => {
      res.status(200).send(`Get to ${req.params.id}`);
    });
  }
}
