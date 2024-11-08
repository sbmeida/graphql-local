Simple example of GraphQL running locally

Start running:
npm run dev

Access: http://localhost:4000/dice
Query:
query MyQuery {
  hello
}

Access: http://localhost:4000/graphql/dice
Query:
query RollDice {
  rollDice(numDice: 3, numSides: 6)
}

Source:
https://graphql.org/graphql-js/

