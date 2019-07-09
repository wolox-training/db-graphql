const { gql } = require('apollo-server');

const { userLoggedIn } = require('../events');

module.exports = {
  subscriptions: {
    onLogin: {
      subscribe: userLoggedIn.iter
    }
  },
  schema: gql`
    extend type Subscription {
      onLogin: String!
    }
  `
};
