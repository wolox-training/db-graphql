const { RedisCache } = require('apollo-server-cache-redis');

const config = require('../config').common.redisCache;

exports.cache = new RedisCache({
  host: config.host,
  port: config.port,
  password: config.password
});
