const { gql } = require('apollo-server');

const resolvers = require('./resolvers');

module.exports = {
  queries: {
    album: resolvers.getAlbum,
    albums: resolvers.getAlbums
  },
  schema: gql`
    extend type Query {
      album(id: ID!): Album!
      albums(offset: Int = 0, limit: Int, orderBy: String, filter: String): [Album]
    }
  `
};
