const { buildSchema } = require("graphql");

const diceSchema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

const diceFn = {
  rollDice: ({ numDice, numSides }) => {
    const sides = numSides || 6; // default to 6 sides if not provided
    return Array.from(
      { length: numDice },
      () => Math.floor(Math.random() * sides) + 1
    );
  },
};

module.exports = {
  diceSchema,
  diceFn,
};
