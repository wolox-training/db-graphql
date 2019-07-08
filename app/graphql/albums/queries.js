const { gql } = require('apollo-server');

const logger = require('../../logger');
const albumsService = require('../../services/albums');

module.exports = {
  queries: {
    album: (_, { id }) => {
      logger.info(`Fetching album with id: ${id}`);
      return albumsService.getAlbum(id);
    }
  },
  schema: gql`
    extend type Query {
      album(id: ID!): Album!
    }
  `
};
