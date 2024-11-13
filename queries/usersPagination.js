const { buildSchema } = require("graphql");

const usersDataSchema = buildSchema(`
  type User {
    username: String
    age: Int
    job: String
  }

  type PaginatedUsers {
    users: [User]
    hasNextPage: Boolean
    hasPreviousPage: Boolean
  }

  type Query {
    getUsers(page: Int!, pageSize: Int!): PaginatedUsers
  }
`);

const usersData = Array.from({ length: 50 }, (_, i) => ({
  username: `user${i + 1}`,
  age: 20 + (i % 30),
  job: `Job Title ${i % 10}`,
}));

const userPaginationFn = {
  getUsers({ page, pageSize }) {
    const start = page * pageSize;
    const end = start + pageSize;
    const paginatedUsers = usersData.slice(start, end);

    return {
      users: paginatedUsers,
      hasNextPage: end < usersData.length,
      hasPreviousPage: end > 0,
    };
  },
};

module.exports = {
  usersDataSchema,
  userPaginationFn,
};
