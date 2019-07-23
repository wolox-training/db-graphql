const { gql } = require('apollo-server');

const resolvers = require('./resolvers');

module.exports = {
  mutations: {
    createUser: resolvers.createUser,
    logIn: resolvers.logIn
  },
  schema: gql`
    extend type Mutation {
      createUser(user: UserInput!): User!
      logIn(user: LogInInput!): AccessToken!
    }
  `
};
