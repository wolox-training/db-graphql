const bcrypt = require('bcryptjs');

const config = require('../../config').common.session;

exports.encodeString = (someString, saltRounds = config.saltRounds) =>
  bcrypt.hash(someString, parseInt(saltRounds));

exports.compareString = (someString, hashedString) => bcrypt.compare(someString, hashedString);
