/* eslint-disable max-params */
const logger = require('../logger');
const cacheHelpers = require('../helpers/cache');
const { cache } = require('../../cache');
const config = require('../../config').common.redisCache;

exports.findInCacheOrResolve = (resolve, root, args, context, info) => {
  const key = cacheHelpers.createCacheKey(root ? root : args, info);
  return cache.get(key).then(cached => {
    if (cached) {
      logger.info(`Response for query ${info.fieldName} fetched from cache`);
      const parsed = JSON.parse(cached);
      return parsed;
    }
    return resolve(root, args, context, info).then(response => {
      exports.updateCache(key, response);
      return response;
    });
  });
};

exports.updateCache = (cacheKey, value, ttl = config.timeToLive) => {
  const stringValue = JSON.stringify(value);
  return (ttl ? cache.set(cacheKey, stringValue, { ttl }) : cache.set(cacheKey, stringValue)).then(() => {
    logger.info(`Cache updated with key ${cacheKey}`);
  });
};
