const jwt = require('jsonwebtoken-promisified');

const commonHelpers = require('./common');
const logger = require('../logger');
const usersService = require('../services/users');
const sessionConfig = require('../../config').common.session;

exports.generateToken = (user, secret = sessionConfig.secret, expiresIn = sessionConfig.expirationTime) => {
  const payload = {
    id: user.id,
    email: user.email
  };
  return jwt.signAsync(payload, secret, { expiresIn });
};

exports.decodeToken = token => jwt.decode(token);

exports.validateCredentials = user => {
  logger.info('Validating user credentials');
  return usersService.getUser({ email: user.email }).then(storedUser => {
    if (storedUser) {
      return commonHelpers
        .compareString(user.password, storedUser.password)
        .then(isPassword => (isPassword ? storedUser : false));
    }
    logger.info(`The user ${user.email} was not found`);
    return false;
  });
};

exports.mapToken = token => {
  const payload = exports.decodeToken(token);
  return {
    accessToken: token,
    expiresIn: payload.exp - payload.iat
  };
};
