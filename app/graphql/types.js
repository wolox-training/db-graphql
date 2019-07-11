const { gql } = require('apollo-server');

module.exports = gql`
  type Query
  type Mutation
  type Subscription
  type User {
    id: ID!
    name: String!
    lastName: String!
    email: String!
    password: String!
  }
  type AccessToken {
    accessToken: String!
    refreshToken: String!
    expiresIn: Int!
  }
  type Album {
    id: ID!
    title: String!
    artist: String!
    photos: [Photo]
  }
  type Photo {
    id: ID!
    albumId: ID!
    title: String!
    url: String!
    thumbnailUrl: String!
  }
`;
