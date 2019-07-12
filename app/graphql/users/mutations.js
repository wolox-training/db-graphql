const { gql } = require('apollo-server');

const resolvers = require('./resolvers');

module.exports = {
  mutations: {
    createUser: resolvers.createUser
  },
  schema: gql`
    extend type Mutation {
      createUser(user: UserInput!): User!
    }
  `
};
