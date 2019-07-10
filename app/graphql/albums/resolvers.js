const logger = require('../../logger');
const albumsService = require('../../services/albums');

exports.getAlbum = (root, args) => {
  logger.info(`Fetching album with id: ${args.id}`);
  return albumsService.getAlbum(args.id).then(album => ({
    ...album,
    artist: album.userId
  }));
};

exports.getAlbums = (root, args) => {
  const { offset, limit, orderBy } = args;
  logger.info(`Fetching albums list... offset: ${offset}, limit: ${limit}, orderBy: ${orderBy}`);
  return albumsService.getAlbums().then(albums =>
    albums
      .slice(offset, offset + limit)
      .map(album => ({
        ...album,
        artist: album.userId
      }))
      .sort((prev, next) => prev[orderBy] > next[orderBy])
  );
};

exports.getPhotos = (root, args) => {
  const { id } = root ? root : args;
  logger.info(`Fetching photos of album with id: ${id}`);
  return albumsService.getPhotos({ albumId: id });
};

exports.typeResolvers = {
  photos: exports.getPhotos
};
