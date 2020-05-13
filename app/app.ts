import express from "express";
import http from "http";
import winston from "winston";
import expressWinston from "express-winston";

import { CommonRoutesConfig } from "./common/common.routes.config";
import { AuthRoutes } from "./auth/auth.routes.config";
import { UsersRoutes } from "./users/users.routes.config";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: number = 3000;
const routes: Array<any> = [];
const index: number = expressWinston.requestWhitelist.indexOf("headers");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (index !== -1) {
  expressWinston.requestWhitelist.splice(index, 1);
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));

  if (req.method === "OPTIONS") {
    return res.status(200).send();
  } else {
    return next();
  }
});

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

routes.push(new AuthRoutes(app));
routes.push(new UsersRoutes(app));

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

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
