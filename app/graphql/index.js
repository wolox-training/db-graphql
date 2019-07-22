const { makeExecutableSchema } = require('graphql-tools');
const { applyMiddleware } = require('graphql-middleware');

const enumsResolvers = require('./enums');
const types = require('./types');
const inputs = require('./inputs');
const users = require('./users');
const albums = require('./albums');
const healthCheck = require('./healthCheck');

const typeDefs = [types, inputs, ...users.schemas, ...healthCheck.schemas, ...albums.schemas];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      ...healthCheck.queries,
      ...users.queries,
      ...albums.queries
    },
    Mutation: {
      ...users.mutations,
      ...albums.mutations
    },
    Subscription: {
      ...users.subscriptions
    },
    Album: {
      ...albums.typeResolvers
    },
    User: {
      ...users.typeResolvers
    },
    ...enumsResolvers
  }
});

const middlewares = {
  Mutation: {
    ...users.middlewares
  }
};

module.exports = applyMiddleware(schema, middlewares);
