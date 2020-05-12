import express from "express";
import { SecurePass } from "argon2-pass";

import { UsersService } from "../services/user.services";

export class UsersController {
  public async index(request: express.Request, response: express.Response) {
    const usersService: any = UsersService.getInstance();
    const users: Array<any> = await usersService.list(100, 0);

    response.status(200).send(users);
  }

  public async get(request: express.Request, response: express.Response) {
    const usersService: any = UsersService.getInstance();
    const user: any = await usersService.readById(request.params.id);

    response.status(200).send(user);
  }

  public async create(request: express.Request, response: express.Response) {
    const usersService: any = UsersService.getInstance();
    const sp: any = new SecurePass();
    const password: any = Buffer.from(request.body.password);

    request.body.password = (await sp.hashPassword(password));
    request.body.permissionLevel = 8;

    const userId: string = await usersService.create(request.body);

    response.status(201).send({ _id: userId });
  }

  public async patch(request: express.Request, response: express.Response) {
    const usersService: any = UsersService.getInstance();
    const result: string = await usersService.patchById(request.body);

    response.status(204).send(result);
  }

  public async put(request: express.Request, response: express.Response) {
    const usersService: any = UsersService.getInstance();
    const result: string = await usersService.updateById(request.body);

    response.status(204).send(result);
  }

  public async delete(request: express.Request, response: express.Response) {
    const usersService: any = UsersService.getInstance();
    const result: string = await usersService.deleteById(request.params.id);

    response.status(204).send(result);
  }
}
