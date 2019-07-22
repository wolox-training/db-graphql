const { ApolloError, UserInputError, AuthenticationError } = require('apollo-server');

const createError = (message, statusCode) => new ApolloError(message, statusCode);

const errorCodes = {
  DEFAULT_ERROR: 500,
  BAD_REQUEST: 400,
  ALBUM_API_ERROR: 503,
  DATABASE_ERROR: 503,
  UNIQUE_EMAIL_ERROR: 409,
  INVALID_INPUT_ERROR: 422,
  USER_NOT_FOUND_ERROR: 404,
  ITEM_NOT_FOUND_ERROR: 404
};

exports.defaultError = message => createError(message, errorCodes.DEFAULT_ERROR);
exports.badRequest = message => createError(message, errorCodes.BAD_REQUEST);
exports.albumApiError = message => createError(message, errorCodes.ALBUM_API_ERROR);
exports.databaseError = message => createError(message, errorCodes.DATABASE_ERROR);
exports.uniqueEmailError = message => createError(message, errorCodes.UNIQUE_EMAIL_ERROR);
exports.invalidInputError = (message, invalidFields) => new UserInputError(message, { invalidFields });
exports.userNotFoundError = message => createError(message, errorCodes.USER_NOT_FOUND_ERROR);
exports.itemNotFoundError = message => createError(message, errorCodes.USER_NOT_FOUND_ERROR);
exports.badLogInError = message => new AuthenticationError(message);
exports.sessionError = message => new AuthenticationError(message);
