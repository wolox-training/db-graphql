const ENVIRONMENT = process.env.NODE_ENV || 'development';

if (ENVIRONMENT !== 'production') {
  require('dotenv').config();
}

const configFile = `./${ENVIRONMENT}`;

const isObject = variable => variable instanceof Object;

/*
 * Deep copy of source object into tarjet object.
 * It does not overwrite properties.
 */
const assignObject = (target, source) => {
  if (target && isObject(target) && source && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(target, key) || target[key] === undefined) {
        target[key] = source[key];
      } else {
        assignObject(target[key], source[key]);
      }
    });
  }
  return target;
};

const config = {
  common: {
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    api: {
      bodySizeLimit: process.env.API_BODY_SIZE_LIMIT,
      parameterLimit: process.env.API_PARAMETER_LIMIT,
      port: process.env.PORT
    },
    rollbar: {
      accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
      environment: process.env.ROLLBAR_ENV
    },
    session: {
      header_name: 'authorization',
      secret: process.env.NODE_API_SESSION_SECRET,
      saltRounds: process.env.ENCRYPTION_SALT_ROUNDS,
      expirationTime: process.env.SESSION_EXPIRATION_TIME
    },
    albumsApi: {
      endpoint: process.env.ALBUM_API_ENDPOINT,
      routes: {
        albums: process.env.ALBUM_API_ROUTE_ALBUMS,
        photos: process.env.ALBUM_API_ROUTE_PHOTOS
      }
    },
    redisCache: {
      host: process.env.REDIS_CACHE_HOST,
      port: process.env.REDIS_CACHE_PORT,
      password: process.env.REDIS_CACHE_PASSWORD,
      timeToLive: process.env.REDIS_CACHE_TIME_TO_LIVE
    }
  }
};

const customConfig = require(configFile).config;
module.exports = assignObject(customConfig, config);
