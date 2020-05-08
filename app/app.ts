import express from "express";
import * as http from "http";

import { CommonRoutesConfig } from "./common/common.routes.config";
import { UsersRoutes } from "./users/users.routes.config";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: number = 3000;
const routes: Array<any> = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes.push(new UsersRoutes(app));

app.get("/", (request: express.Request, response: express.Response) => {
  response.status(200).send(`Server running at port ${port}`);
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);

  routes.forEach((route: CommonRoutesConfig) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
});

export default app;
