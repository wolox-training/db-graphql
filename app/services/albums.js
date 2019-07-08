const request = require('request-promise');

const logger = require('../logger');
const { albumsApi } = require('../../config').common;

exports.getAlbum = qs => {
  const options = {
    method: 'GET',
    uri: `${albumsApi.endpoint}${albumsApi.routes.albums}`,
    qs,
    json: true
  };
  logger.info(`Request to make: ${options.method} ${options.uri} ${JSON.stringify(options.qs)}`);

  return request(options).then(album =>
    this.getPhotos({ albumId: album[0].id }).then(photos => ({
      ...album[0],
      artist: album[0].userId,
      photos
    }))
  );
};

exports.getPhotos = qs => {
  const options = {
    method: 'GET',
    uri: `${albumsApi.endpoint}${albumsApi.routes.photos}`,
    qs,
    json: true
  };
  logger.info(`Request to make: ${options.method} ${options.uri} ${JSON.stringify(options.qs)}`);
  return request(options);
};
