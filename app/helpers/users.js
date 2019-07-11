const bcrypt = require('bcryptjs');

const config = require('../../config').common.session;

exports.encodePassword = password => bcrypt.hash(password, parseInt(config.saltRounds));
