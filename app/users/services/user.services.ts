import { GenericInMemoryDao } from "../daos/in.memory.dao";
import { CRUD } from "../../common/interfaces";

export class UsersService implements CRUD {
  private static instance: UsersService;
  public dao: GenericInMemoryDao;

  constructor() {
    this.dao = GenericInMemoryDao.getInstance();
  }

  public static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService();
    }

    return UsersService.instance;
  }

  public list(limit: number, page: number): Array<any> {
    return this.dao.getUsers();
  }

  public readById(id: string): any {
    return this.dao.getUserById(id);
  }

  public create(user: any): any {
    return this.dao.addUser(user);
  }

  public updateById(user: any): string {
    return this.dao.putUserById(user);
  }

  public patchById(user: any): string {
    return this.dao.patchUserById(user);
  }

  public deleteById(id: string): string {
    return this.dao.removeUserById(id);
  }
}
