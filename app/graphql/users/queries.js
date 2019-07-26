const { gql } = require('apollo-server');

const resolvers = require('./resolvers');

module.exports = {
  queries: {
    user: resolvers.getUser,
    users: resolvers.getUsers,
    cache: (root, args, context) => {
      context.cache.set(context.cacheKey, 'world', 3);
      return 'ama cache';
    }
  },
  schema: gql`
    extend type Query {
      user(id: ID, name: String, email: String): User!
      users: [User]
      cache(id: ID): String!
    }
  `
};
