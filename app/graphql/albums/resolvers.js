const logger = require('../../logger');
const albumsHelpers = require('../../helpers/albums');
const albumsService = require('../../services/albums');

exports.getAlbum = (root, args) => {
  logger.info(`Fetching album with id: ${args.id}`);
  return albumsService.getAlbum(args.id).then(albumsHelpers.albumMapper);
};

exports.getAlbums = (root, args) => {
  const { offset, limit, orderBy, filter } = args;
  logger.info(`Fetching albums list... offset: ${offset}, limit: ${limit}, orderBy: ${orderBy}`);
  let albums = [];
  return albumsService
    .getAlbums()
    .then(albumsHelpers.albumsMapper)
    .then(result => {
      albums = filter ? albumsHelpers.filterByTitle(result, filter) : result;
      albums = limit ? albumsHelpers.paginate(albums, offset, limit) : albums;
      albums = orderBy ? albumsHelpers.orderBy(albums, orderBy) : albums;
      return albums;
    });
};

exports.getPhotos = (root, args) => {
  const { id } = root ? root : args;
  logger.info(`Fetching photos of album with id: ${id}`);
  return albumsService.getPhotos({ albumId: id });
};

exports.typeResolvers = {
  photos: exports.getPhotos
};
