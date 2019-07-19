const errors = require('../../errors');
const logger = require('../../logger');
const commonHelpers = require('../../helpers/common');
const usersService = require('../../services/users');

exports.createUser = (root, { user }) => {
  logger.info(`Registering a new user: ${user.email}`);
  return commonHelpers
    .encodeString(user.password)
    .then(hashedPassword => usersService.createUser({ ...user, password: hashedPassword }))
    .then(createdUser => {
      logger.info(`Created user ${createdUser.name} with id ${createdUser.id} successfully`);
      return createdUser;
    })
    .catch(error => {
      logger.error(`Failed to create user. Error: ${error.message}`);
      throw error;
    });
};

exports.getUser = (root, args) => {
  logger.info(`Fetching user with ${JSON.stringify(args)}`);
  return usersService
    .getUser(args)
    .then(user => (user ? user : Promise.reject(errors.userNotFoundError('The user was not found'))))
    .catch(error => {
      logger.error(`Failed to find user. Error: ${error.message}`);
      throw error;
    });
};

exports.getUsers = () => {
  logger.info('Fetching the users list');
  return usersService.getUsers().catch(error => {
    logger.error(`Failed to get the users list. Error: ${error.message}`);
    throw error;
  });
};

exports.typeResolvers = {
  name: root => `${root.name} ${root.lastName}`
};
