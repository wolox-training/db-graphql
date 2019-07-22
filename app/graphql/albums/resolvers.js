const logger = require('../../logger');
const albumsHelpers = require('../../helpers/albums');
const albumsService = require('../../services/albums');

exports.getAlbum = (root, { id }) => {
  logger.info(`Fetching album with id: ${id}`);
  return albumsService.getAlbum(id).then(albumsHelpers.albumMapper);
};

exports.getAlbums = (root, { filter, offset, limit, orderBy }) => {
  logger.info(`Fetching albums list... offset: ${offset}, limit: ${limit}, orderBy: ${orderBy}`);
  return albumsService
    .getAlbums()
    .then(albums => albumsHelpers.filterAndFormat(albums, { filter, offset, limit, orderBy }));
};

exports.getPhotos = (root, args) => {
  const { id } = root ? root : args;
  logger.info(`Fetching photos of album with id: ${id}`);
  return albumsService.getPhotos({ albumId: id });
};

exports.buyAlbum = (root, { albumId, user }) => {
  logger.info(`Buying album with id: ${albumId} for user: ${user.email}`);
  return albumsService
    .getAlbum(albumId)
    .then(album => albumsService.addAlbum({ ...albumsHelpers.albumMapper(album), userId: user.id }))
    .catch(error => {
      logger.error(`Failed to buy album. Error: ${error.message}`);
      throw error;
    });
};

exports.typeResolvers = {
  photos: exports.getPhotos
};
