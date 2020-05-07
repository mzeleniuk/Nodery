import express from "express";

export class UsersController {
  public index(request: express.Request, response: express.Response) {
    response.status(200).send("Get to users");
  }

  public get(request: express.Request, response: express.Response) {
    response.status(200).send(`Get to user ${request.params.id}`);
  }

  public create(request: express.Request, response: express.Response) {
    response.status(200).send(`Post to user ${request.params.id}`);
  }

  public patch(request: express.Request, response: express.Response) {
    response.status(200).send(`Patch to user ${request.params.id}`);
  }

  public put(request: express.Request, response: express.Response) {
    response.status(200).send(`Put to user ${request.params.id}`);
  }

  public delete(request: express.Request, response: express.Response) {
    response.status(200).send(`Delete to user ${request.params.id}`);
  }
}
