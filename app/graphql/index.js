const { makeExecutableSchema } = require('graphql-tools');
const types = require('./types');
const inputs = require('./inputs');
const users = require('./users');
const album = require('./albums');
const healthCheck = require('./healthCheck');

const typeDefs = [types, inputs, ...users.schemas, ...healthCheck.schemas, ...album.schemas];

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      ...healthCheck.queries,
      ...users.queries,
      ...album.queries
    },
    Mutation: {
      ...users.mutations
    },
    Subscription: {
      ...users.subscriptions
    }
  }
});
