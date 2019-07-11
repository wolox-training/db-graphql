const request = require('request-promise');

const errors = require('../errors');
const logger = require('../logger');
const { albumsApi } = require('../../config').common;

exports.executeRequest = options => {
  logger.info(`Request: ${options.method} ${options.uri} ${options.qs ? JSON.stringify(options.qs) : ''}`);
  if (options.headers) {
    logger.info(`Headers: [${Object.keys(options.headers).join(', ')}]`);
  }
  return request(options).catch(error => {
    throw errors.albumApiError(error.message);
  });
};

exports.getAlbum = id => {
  const options = {
    method: 'GET',
    uri: `${albumsApi.endpoint}${albumsApi.routes.albums}/${id}`,
    json: true
  };
  return exports.executeRequest(options);
};

exports.getAlbums = () => {
  const options = {
    method: 'GET',
    uri: `${albumsApi.endpoint}${albumsApi.routes.albums}`,
    json: true
  };
  return exports.executeRequest(options);
};

exports.getPhotos = qs => {
  const options = {
    method: 'GET',
    uri: `${albumsApi.endpoint}${albumsApi.routes.photos}`,
    qs,
    json: true
  };
  return exports.executeRequest(options);
};
