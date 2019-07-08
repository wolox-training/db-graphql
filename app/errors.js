const { ApolloError } = require('apollo-server');

const createError = (message, statusCode) => new ApolloError(message, statusCode);

const errorCodes = {
  DEFAULT_ERROR: 500,
  BAD_REQUEST: 400,
  ALBUM_API_ERROR: 503
};

exports.defaultError = message => createError(message, errorCodes.DEFAULT_ERROR);
exports.badRequest = message => createError(message, errorCodes.BAD_REQUEST);
exports.albumApiError = message => createError(message, errorCodes.ALBUM_API_ERROR);
