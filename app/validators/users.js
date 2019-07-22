const errors = require('../errors');
const usersHelpers = require('../helpers/users');

exports.validateAuthetication = (root, args, context) => {
  const token = context.authorization;
  if (token) {
    return usersHelpers
      .validateToken(token)
      .then(decodedToken => {
        args.user = decodedToken;
      })
      .catch(error => {
        throw errors.sessionError(`Session error: ${error.message}`);
      });
  }
  throw errors.sessionError('Session error: no token provided');
};
