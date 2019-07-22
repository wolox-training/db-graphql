const { gql } = require('apollo-server');

module.exports = gql`
  type Query
  type Mutation
  type Subscription

  type User {
    name: String!
    firstName: String! @deprecated(reason: "Use 'name' field instead")
    lastName: String! @deprecated(reason: "Use 'name' field instead")
    username: String! @deprecated
    email: String!
    password: String!
    id: ID!
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
  enum OrderAlbumsBy {
    ID
    TITLE
    ARTIST
  }
  type Photo {
    id: ID!
    albumId: ID!
    title: String!
    url: String!
    thumbnailUrl: String!
  }
`;
