const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");
const { ruruHTML } = require("ruru/server");

const app = express();

// First Schema and Resolver (for /graphql)
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const mainRoot = {
  hello() {
    return "Hello world 3!";
  },
};

// First Schema and Resolver (for /graphql/dice)
const diceSchema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

const diceRoot = {
  rollDice: ({ numDice, numSides }) => {
    const sides = numSides || 6; // default to 6 sides if not provided
    return Array.from(
      { length: numDice },
      () => Math.floor(Math.random() * sides) + 1
    );
  },
};

// Serve the first GraphQL endpoint at /graphql
app.use(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: mainRoot,
  })
);

// Serve the second GraphQL endpoint at /graphql/dice
app.use(
  "/dicetest",
  createHandler({
    schema: diceSchema,
    rootValue: diceRoot,
  })
);

// Serve the GraphiQL IDE for /graphql endpoint
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Serve the GraphiQL IDE for /graphql/dice endpoint
app.get("/dice", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/dicetest" }));
});

// Start the server at port
const PORT = 4000;
app.listen(PORT, () => {
  console.log(
    `Main GraphQL API server running at http://localhost:${PORT}/graphql`
  );
  console.log(
    `Dice GraphQL API server running at http://localhost:${PORT}/graphql/dice`
  );
});
