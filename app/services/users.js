const { User } = require('../models');
const errors = require('../errors');

exports.createUser = user =>
  User.create(user).catch(error => {
    throw error.name === 'SequelizeUniqueConstraintError'
      ? errors.uniqueEmailError('The provided email is already in use.')
      : errors.databaseError(`${error.name}: ${error.message}`);
  });

exports.getUser = params =>
  User.findOne({ where: params }).catch(error => {
    throw errors.databaseError(`${error.name}: ${error.message}`);
  });

exports.getUsers = () =>
  User.findAll().catch(error => {
    throw errors.databaseError(`${error.name}: ${error.message}`);
  });
