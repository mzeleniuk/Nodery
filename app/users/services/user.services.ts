import { GenericInMemoryDao } from "../daos/in.memory.dao";
import { UsersDao } from "../daos/users.dao";
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
    return UsersDao.getInstance().listUsers(limit, page);
  }

  public readById(id: string): any {
    return UsersDao.getInstance().getUserById(id);
  }

  public create(user: any): any {
    return UsersDao.getInstance().addUser(user);
  }

  public updateById(user: any): string {
    return UsersDao.getInstance().patchUser(user);
  }

  public patchById(user: any): string {
    return UsersDao.getInstance().patchUser(user);
  }

  public deleteById(id: string): string {
    return UsersDao.getInstance().removeUserById(id);
  }

  public async getByEmail(email: string): Promise<any> {
    return UsersDao.getInstance().getUserByEmail(email);
  }
}
