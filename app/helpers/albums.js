const logger = require('../logger');

exports.albumMapper = album => ({
  id: album.id,
  title: album.title,
  artist: album.userId
});

exports.albumsMapper = albums => albums.map(exports.albumMapper);

exports.filterByTitle = (albums, filter) => {
  logger.info(`Filtering by title that contains '${filter}'`);
  return albums.filter(({ title }) => title.includes(filter));
};

exports.paginate = (albums, offset, limit) => albums.slice(offset, offset + limit);

exports.orderBy = (albums, orderBy) => albums.sort((prev, next) => (prev[orderBy] > next[orderBy] ? 1 : -1));

exports.filterAndFormat = (rawAlbums, modifiers) => {
  const { filter, offset, limit, orderBy } = modifiers;
  let albums = exports.albumsMapper(rawAlbums);
  albums = filter ? exports.filterByTitle(albums, filter) : albums;
  albums = limit ? exports.paginate(albums, offset, limit) : albums;
  albums = orderBy ? exports.orderBy(albums, orderBy) : albums;
  return albums;
};
