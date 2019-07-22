const request = require('request-promise');
const util = require('util');

const errors = require('../errors');
const logger = require('../logger');
const { Album } = require('../models');
const { albumsApi } = require('../../config').common;

exports.executeRequest = options => {
  logger.info(`Request: ${options.method} ${options.uri} ${options.qs ? util.inspect(options.qs) : ''}`);
  if (options.headers) {
    logger.info(`Headers: [${Object.keys(options.headers).join(', ')}]`);
  }
  return request(options).catch(error => {
    throw error.statusCode === 404
      ? errors.itemNotFoundError('Item not found in external api')
      : errors.albumApiError(error.message);
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

exports.addAlbum = album =>
  Album.create(album).catch(error => {
    throw error.name === 'SequelizeUniqueConstraintError'
      ? errors.uniqueEmailError(`The user has already bought album with id ${album.id}`)
      : errors.databaseError(`${error.name}: ${error.message}`);
  });
