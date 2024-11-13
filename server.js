const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");
const { diceSchema, diceFn } = require("./queries/dice");
const { helloSchema, helloFn } = require("./queries/hello");
const {
  usersDataSchema,
  userPaginationFn,
} = require("./queries/usersPagination");
const { ruruHTML } = require("ruru/server");

const app = express();

// Start Hello
app.use(
  "/helloRouter",
  createHandler({
    schema: helloSchema,
    rootValue: helloFn,
  })
);

app.get("/hello", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/helloRouter" }));
});
// End Hello

// Start Dice
app.use(
  "/diceRouter",
  createHandler({
    schema: diceSchema,
    rootValue: diceFn,
  })
);

app.get("/dice", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/diceRouter" }));
});
// End Dice

// Start usersData
app.use(
  "/creatorspaginationEndpoint",
  createHandler({
    schema: usersDataSchema,
    rootValue: userPaginationFn,
  })
);

app.get("/usersPagination", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/creatorspaginationEndpoint" }));
});
// End usersData

const PORT = 4000;
app.listen(PORT, () => {
  console.log(
    `Main GraphQL API server running at http://localhost:${PORT}/hello`,
    `Hello GraphQL API server running at http://localhost:${PORT}/dice`,
    `Users GraphQL API server running at http://localhost:${PORT}/usersPagination`
  );
});
