const { gql } = require('apollo-server');

const albumsService = require('../../services/albums');

module.exports = {
  queries: {
    album: (_, id) => albumsService.getAlbum(id)
  },
  schema: gql`
    extend type Query {
      album(id: ID, title: String): Album!
    }
  `
};
