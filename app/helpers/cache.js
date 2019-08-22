const crypto = require('crypto');

exports.createCacheKey = (args, { fieldName }) => {
  const stringKey = `${fieldName}/${JSON.stringify(args)}`;
  const hashedKey = crypto
    .createHash('sha256')
    .update(stringKey)
    .digest('hex');
  return hashedKey;
};
