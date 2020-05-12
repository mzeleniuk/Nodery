import * as shortUUID from "short-uuid";
import { MongooseService } from "../../common/services/mongoose.service";

export class UsersDao {
  public mongooseService: MongooseService = MongooseService.getInstance();
  private static instance: UsersDao;

  public Schema: any = this.mongooseService.getMongoose().Schema;
  public userSchema: any = new this.Schema({
    _id: String,
    name: String,
    email: String,
    description: String,
    password: String,
    permissionLevel: Number
  });
  public User: any = this.mongooseService.getMongoose().model("Users", this.userSchema);

  constructor() { }

  public static getInstance(): any {
    if (!this.instance) {
      this.instance = new UsersDao();
    }

    return this.instance;
  }

  public async addUser(userFields: any): Promise<string> {
    userFields._id = shortUUID.generate();

    const user: any = new this.User(userFields);
    await user.save();

    return userFields._id;
  }

  public async getUserByEmail(email: string): Promise<any> {
    return this.User.findOne({ email: email });
  }

  public async removeUserById(id: string): Promise<any> {
    await this.User.deleteOne({ _id: id });
  }

  public async getUserById(id: string): Promise<any> {
    return this.User.findOne({ _id: id });
  }

  public async listUsers(limit: number = 25, page: number = 0): Promise<any> {
    return this.User.find().limit(limit).skip(limit * page).exec();
  }

  public async patchUser(userFields: any): Promise<any> {
    const user: any = await this.User.findById(userFields._id);

    if (user) {
      for (let i in userFields) {
        user[i] = userFields[i];
      }

      return await user.save();
    }
  }
}
