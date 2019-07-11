const logger = require('../../logger');
const albumsHelpers = require('../../helpers/albums');
const albumsService = require('../../services/albums');

exports.getAlbum = (root, args) => {
  logger.info(`Fetching album with id: ${args.id}`);
  return albumsService.getAlbum(args.id).then(albumsHelpers.albumMapper);
};

exports.getAlbums = (root, args) => {
  const { filter, offset, limit, orderBy } = args;
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

exports.typeResolvers = {
  photos: exports.getPhotos
};
