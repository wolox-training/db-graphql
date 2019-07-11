const logger = require('../../logger');
const usersHelpers = require('../../helpers/users');
const usersService = require('../../services/users');

exports.createUser = (root, { user }) => {
  logger.info(`Registering a new user: ${user.email}`);
  return usersHelpers
    .encodePassword(user.password)
    .then(hashedPassword => usersService.createUser({ ...user, password: hashedPassword }))
    .then(createdUser => {
      logger.info(`Created user ${createdUser.name} with id ${createdUser.id} successfully`);
      return createdUser;
    })
    .catch(error => {
      logger.error(`Failed to create user. Due to: ${error.message}`);
      throw error;
    });
};
