const { buildSchema, query } = require("graphql");

const helloSchema = buildSchema(`
  type Query {
    hello: String
  }
`);

const helloFn = {
  hello() {
    return "Hello world!";
  },
};

module.exports = {
  helloSchema,
  helloFn,
};
