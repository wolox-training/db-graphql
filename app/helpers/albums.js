const logger = require('../logger');

exports.filterByTitle = (albums, filter) => {
  logger.info(`Filtering by title that contains '${filter}'`);
  return albums.filter(({ title }) => title.includes(filter));
};

exports.albumMapper = album => ({
  ...album,
  artist: album.userId
});

exports.albumsMapper = albums => albums.map(exports.albumMapper);

exports.paginate = (albums, offset, limit) => albums.slice(offset, offset + limit);

exports.orderBy = (albums, orderBy) => albums.sort((prev, next) => (prev[orderBy] > next[orderBy] ? 1 : -1));
