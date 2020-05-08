import { expect } from "chai";
import { agent as request } from "supertest";

import app from "../../app/app";

let firstUserIdTest: string = "";
let firstUserBody: any = {
  "id": "1",
  "name": "Test User",
  "email": "test@mail.com",
  "password": "secret"
};

let jwt: any = {
  accessToken: "",
  refreshToken: ""
};

it("should POST /users", async function () {
  const res: any = await request(app).post("/users").send(firstUserBody);

  expect(res.status).to.equal(201);
  expect(res.body).not.to.be.empty;
  expect(res.body.user).to.be.an("object");
  expect(res.body.user.id).to.be.an("string");

  firstUserIdTest = res.body.id;
});

it("should POST to /auth and retrieve an access token", async () => {
  const res: any = await request(app).post("/auth").send({
    "email": firstUserBody.email,
    "password": firstUserBody.password
  });

  expect(res.status).to.equal(201);
  expect(res.body).not.to.be.empty;
  expect(res.body).to.be.an("object");
  expect(res.body.accessToken).to.be.an("string");
  expect(res.body.refreshToken).to.be.an("string");

  jwt.accessToken = res.body.accessToken;
  jwt.refreshToken = res.body.refreshToken;
});

it("should POST to /auth/refresh-token and receive 403 for having an invalid JWT", async () => {
  const res: any = await request(app)
    .post("/auth/refresh-token")
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${jwt.accessToken}12345`)
    .send({ "refreshToken": jwt.refreshToken });

  expect(res.status).to.equal(403);
});

it("should POST to /auth/refresh-token and receive 401 for not having a JWT set", async () => {
  const res: any = await request(app)
    .post("/auth/refresh-token")
    .set("Accept", "application/json")
    .send({ "refreshToken": jwt.refreshToken });

  expect(res.status).to.equal(401);
});

it("should POST to /auth/refresh-token and receive 400 for having an invalid refreshToken", async () => {
  const res: any = await request(app)
    .post("/auth/refresh-token")
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${jwt.accessToken}`)
    .send({ "refreshToken": "123" });

  expect(res.status).to.equal(400);
});

it("should POST to /auth/refresh-token and retrieve a new access token", async () => {
  const res: any = await request(app)
    .post("/auth/refresh-token")
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${jwt.accessToken}`)
    .send({ "refreshToken": jwt.refreshToken });

  expect(res.status).to.equal(201);
  expect(res.body).not.to.be.empty;
  expect(res.body).to.be.an("object");
  expect(res.body.accessToken).to.be.an("string");
  expect(res.body.refreshToken).to.be.an("string");

  jwt.accessToken = res.body.accessToken;
  jwt.refreshToken = res.body.refreshToken;
});

it("should DELETE /users/:id", async function () {
  const res: any = await request(app).delete(`/users/${firstUserIdTest}`).send();

  expect(res.status).to.equal(204);
});