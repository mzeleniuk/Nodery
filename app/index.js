const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const port = 3000;

app.get("/", (request, response) => {
  response.status(200).send(`Hello World! Our server is running at port ${port}`);
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
