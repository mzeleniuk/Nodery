import express from "express";
import { UsersService } from "../services/user.services";

export class UsersController {
  public index(request: express.Request, response: express.Response) {
    const usersService: any = UsersService.getInstance();
    const users: Array<any> = usersService.list(100, 0);

    response.status(200).send(users);
  }

  public get(request: express.Request, response: express.Response) {
    const usersService: any = UsersService.getInstance();
    const user: any = usersService.readById(request.params.id);

    response.status(200).send(user);
  }

  public create(request: express.Request, response: express.Response) {
    const usersService: any = UsersService.getInstance();
    const user: any = usersService.create(request.body);

    response.status(201).send({ user: user });
  }

  public patch(request: express.Request, response: express.Response) {
    const usersService: any = UsersService.getInstance();
    const result: string = usersService.patchById(request.body);

    response.status(204).send(result);
  }

  public put(request: express.Request, response: express.Response) {
    const usersService: any = UsersService.getInstance();
    const result: string = usersService.updateById(request.body);

    response.status(204).send(result);
  }

  public delete(request: express.Request, response: express.Response) {
    const usersService: any = UsersService.getInstance();
    const result: string = usersService.deleteById(request.params.id);

    response.status(204).send(result);
  }
}
