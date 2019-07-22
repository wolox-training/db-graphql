const { gql } = require('apollo-server');

module.exports = gql`
  input UserInput {
    name: String!
    lastName: String!
    email: String!
    password: String!
  }
  input LogInInput {
    email: String!
    password: String!
  }
`;
