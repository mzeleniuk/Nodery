export class GenericInMemoryDao {
  public static instance: GenericInMemoryDao;
  public users: Array<any> = [];

  constructor() {
    console.log("Created new instance of GenericInMemoryDao");
  }

  public static getInstance(): GenericInMemoryDao {
    if (!GenericInMemoryDao.instance) {
      GenericInMemoryDao.instance = new GenericInMemoryDao();
    }

    return GenericInMemoryDao.instance;
  }

  public addUser(user: any): any {
    this.users.push(user);
    return user;
  }

  public getUsers(): Array<any> {
    return this.users;
  }

  public getUserById(id: string): any {
    return this.users.find((user: { id: string; }) => user.id === id);
  }

  public putUserById(user: any): string {
    const objIndex: any = this.users.findIndex((obj: { id: string; }) => obj.id === user.id);
    const updatedUsers: Array<any> = [...this.users.slice(0, objIndex), user, ...this.users.slice(objIndex + 1)];

    this.users = updatedUsers;
    return `${user.id} updated via PUT`;
  }

  public patchUserById(user: any): string {
    const objIndex: any = this.users.findIndex((obj: { id: string; }) => obj.id === user.id);
    let currentUser: any = this.users[objIndex];

    for (let i in user) {
      if (i !== "id") {
        currentUser[i] = user[i];
      }
    }

    this.users = [...this.users.slice(0, objIndex), currentUser, ...this.users.slice(objIndex + 1)];
    return `${user.id} patched`;
  }

  public removeUserById(id: string): string {
    const objIndex: any = this.users.findIndex((obj: { id: string; }) => obj.id === id);

    this.users = this.users.splice(objIndex, objIndex);
    return `${id} removed`;
  }
}
