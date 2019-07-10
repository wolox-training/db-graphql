const request = require('request-promise');

const errors = require('../errors');
const logger = require('../logger');
const { albumsApi } = require('../../config').common;

exports.getAlbum = id => {
  const options = {
    method: 'GET',
    uri: `${albumsApi.endpoint}${albumsApi.routes.albums}/${id}`,
    json: true
  };
  logger.info(`Request to make: ${options.method} ${options.uri}`);
  return request(options).catch(error => {
    throw errors.albumApiError(error.message);
  });
};

exports.getAlbums = () => {
  const options = {
    method: 'GET',
    uri: `${albumsApi.endpoint}${albumsApi.routes.albums}`,
    json: true
  };
  logger.info(`Request to make: ${options.method} ${options.uri}`);
  return request(options).catch(error => {
    throw errors.albumApiError(error.message);
  });
};

exports.getPhotos = qs => {
  const options = {
    method: 'GET',
    uri: `${albumsApi.endpoint}${albumsApi.routes.photos}`,
    qs,
    json: true
  };
  logger.info(`Request to make: ${options.method} ${options.uri} ${JSON.stringify(options.qs)}`);
  return request(options).catch(error => {
    throw errors.albumApiError(error.message);
  });
};
