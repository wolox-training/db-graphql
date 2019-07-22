const { gql } = require('apollo-server');

const resolvers = require('./resolvers');

module.exports = {
  mutations: {
    buyAlbum: resolvers.buyAlbum
  },
  schema: gql`
    extend type Mutation {
      buyAlbum(albumId: ID!): Album!
    }
  `
};
