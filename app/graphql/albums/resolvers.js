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
  const { limit, offset, orderBy } = args;
  logger.info(`Fetching albums list ${limit} ${offset} ${orderBy}`);
  return albumsService.getAlbums().then(albums =>
    albums
      .map(album => ({
        ...album,
        artist: album.userId
      }))
      .slice(offset, offset + limit)
      .sort((prev, next) => prev[orderBy] > next[orderBy])
  );
};

exports.getPhotos = (root, args) => {
  const { id } = root ? root : args;
  logger.info(`Fetching photos of album with id: ${id}`);
  return albumsService.getPhotos({ albumId: id });
};

exports.typeResolvers = {
  photos: this.getPhotos
};
