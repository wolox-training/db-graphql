const logger = require('../../logger');
const albumsService = require('../../services/albums');

exports.getAlbum = (root, { id }) => {
  logger.info(`Fetching album with id: ${id}`);
  return albumsService.getAlbum(id).then(album => ({
    ...album,
    artist: album.userId
  }));
};

exports.getAlbums = (root, { offset, limit, orderBy }) => {
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
