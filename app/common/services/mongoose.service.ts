import mongoose from "mongoose";

export class MongooseService {
  private static instance: MongooseService;

  public count: number = 0;
  public options: object = {
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  constructor() {
    this.connectWithRetry();
  }

  public static getInstance(): any {
    if (!this.instance) {
      this.instance = new MongooseService();
    }

    return this.instance;
  }

  public getMongoose(): any {
    return mongoose;
  }

  private connectWithRetry(): void {
    console.log("MongoDB connection with retry");

    mongoose.connect("mongodb://mongo:27017/api-db", this.options).then(() => {
      console.log("MongoDB is connected");
    }).catch(err => {
      console.log("MongoDB connection unsuccessful, retry after 5 seconds. ", ++this.count);
      setTimeout(this.connectWithRetry, 5000);
    });
  }
}
