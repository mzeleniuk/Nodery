import { expect } from "chai";
import { agent as request } from "supertest";
import * as shortUUID from "short-uuid";

import app from "../../app/app";

let firstUserIdTest: string = "";
let firstUserBody: any = {
  "name": "Test User",
  "email": `test+${shortUUID.generate()}@mail.com`,
  "password": "secret"
};

it("should POST /users", async function () {
  const res: any = await request(app).post("/users").send(firstUserBody);

  expect(res.status).to.equal(201);
  expect(res.body).not.to.be.empty;
  expect(res.body).to.be.an("object");
  expect(res.body._id).to.be.an("string");

  firstUserIdTest = res.body._id;
});

it("should GET /users/:id", async function () {
  const res: any = await request(app).get(`/users/${firstUserIdTest}`).send();

  expect(res.status).to.equal(200);
  expect(res.body).not.to.be.empty;
  expect(res.body).to.be.an("object");
  expect(res.body._id).to.be.an("string");
  expect(res.body.name).to.be.equals(firstUserBody.name);
  expect(res.body.email).to.be.equals(firstUserBody.email);
  expect(res.body._id).to.be.equals(firstUserIdTest);
});

it("should GET /users", async function () {
  const res: any = await request(app).get("/users").send();

  expect(res.status).to.equal(200);
  expect(res.body).not.to.be.empty;
  expect(res.body).to.be.an("array");
  expect(res.body[0]._id).to.be.an("string");
  expect(res.body[0].name).to.be.equals(firstUserBody.name);
  expect(res.body[0].email).to.be.equals(firstUserBody.email);
  expect(res.body[0]._id).to.be.equals(firstUserIdTest);
});

it("should PUT /users/:id", async function () {
  const name: string = "Jose";
  const res: any = await request(app).put(`/users/${firstUserIdTest}`).send({
    name: name,
    email: firstUserBody.email
  });

  expect(res.status).to.equal(204);
});

it("should GET /users/:id to have a new name", async function () {
  const res: any = await request(app).get(`/users/${firstUserIdTest}`).send();

  expect(res.status).to.equal(200);
  expect(res.body).not.to.be.empty;
  expect(res.body).to.be.an("object");
  expect(res.body._id).to.be.an("string");
  expect(res.body.name).to.be.not.equals(firstUserBody.name);
  expect(res.body.email).to.be.equals(firstUserBody.email);
  expect(res.body._id).to.be.equals(firstUserIdTest);
});

it("should PATCH /users/:id", async function () {
  let newField: any = { description: "My user description" };
  const res: any = await request(app).patch(`/users/${firstUserIdTest}`).send(newField);

  expect(res.status).to.equal(204);
});

it("should GET /users/:id to have a new field called description", async function () {
  const res: any = await request(app).get(`/users/${firstUserIdTest}`).send();

  expect(res.status).to.equal(200);
  expect(res.body).not.to.be.empty;
  expect(res.body).to.be.an("object");
  expect(res.body._id).to.be.an("string");
  expect(res.body.description).to.be.equals("My user description");
});

it("should DELETE /users/:id", async function () {
  const res: any = await request(app).delete(`/users/${firstUserIdTest}`).send();

  expect(res.status).to.equal(204);
});

it("should GET /users", async function () {
  const res: any = await request(app).get(`/users`).send();

  expect(res.status).to.equal(200);
  expect(res.body).to.be.an("array");
  expect(res.body).to.be.empty;
});
