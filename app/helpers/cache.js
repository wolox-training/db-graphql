/* eslint-disable max-params */
const crypto = require('crypto');

const logger = require('../logger');

exports.createCacheKey = (args, { fieldName }) => {
  const stringKey = `${fieldName}/${JSON.stringify(args)}`;
  const hashedKey = crypto
    .createHash('sha256')
    .update(stringKey)
    .digest('hex');
  return hashedKey;
};

exports.findInCacheOrResolve = (resolve, root, args, context, info) => {
  const { cache } = context;
  const key = exports.createCacheKey(root ? root : args, info);
  return cache.get(key).then(cached => {
    if (cached) {
      logger.info(`Response for query ${info.fieldName} fetched from cache`);
      const parsed = JSON.parse(cached);
      return parsed;
    }
    return resolve(root, args, context, info).then(response => {
      exports.updateCache(context.cache, key, response);
      return response;
    });
  });
};

exports.updateCache = (cache, cacheKey, value, ttl = 300) => {
  const stringValue = JSON.stringify(value);
  return cache.set(cacheKey, stringValue, ttl).then(() => {
    logger.info(`Cache updated with key ${cacheKey}`);
  });
};
