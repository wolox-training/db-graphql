const { gql } = require('apollo-server');

const resolvers = require('./resolvers');

module.exports = {
  queries: {
    user: resolvers.getUser,
    users: resolvers.getUsers
  },
  schema: gql`
    extend type Query {
      user(id: ID, name: String, email: String): User!
      users: [User]
    }
  `
};
