const errors = require('../../errors');
const { EMAIL_REGEX, PASSWORD_REGEX } = require('../../helpers/constants');

exports.createUser = (resolve, root, args) => {
  const { user } = args;
  const errorList = [];
  if (!EMAIL_REGEX.test(user.email)) {
    errorList.push({
      field: 'email',
      message: 'email must be a valid one in the Wolox domains',
      statusCode: 422
    });
  }
  if (!PASSWORD_REGEX.test(user.password)) {
    errorList.push({
      field: 'password',
      message: 'password must be alphanumeric and have more than 8 characters',
      statusCode: 422
    });
  }

  if (errorList.length > 0) {
    throw errors.invalidInputError('Invalid input values', errorList);
  }
  return resolve(root, args);
};
