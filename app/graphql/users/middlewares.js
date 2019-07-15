const errors = require('../../errors');

const emailRegex = /^[a-zñ0-9.+_-]+@(wolox.(ar|cl|co|com|com.ar))$/i;
const passwordRegex = /^[a-zñ0-9._-]{8,}$/i;

exports.createUser = (resolve, root, args) => {
  const { user } = args;
  const errorList = [];
  if (!emailRegex.test(user.email)) {
    errorList.push('email must be a valid one in the Wolox domains');
  }
  if (!passwordRegex.test(user.password)) {
    errorList.push('password must be alphanumeric and have more than 8 characters');
  }
  if (errorList.length > 0) {
    throw errors.badRequest(errorList.join(', '));
  }
  return resolve(root, args);
};
