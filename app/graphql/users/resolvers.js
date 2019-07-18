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

exports.typeResolvers = {
  name: root => `${root.name} ${root.lastName}`
};
