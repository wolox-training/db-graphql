const usersValidators = require('../../validators/users');

exports.buyAlbum = (resolve, root, args, context) =>
  usersValidators.validateAuthetication(root, args, context).then(() => resolve(root, args, context));
