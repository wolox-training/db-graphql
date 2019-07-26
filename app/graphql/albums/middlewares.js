/* eslint-disable max-params */
const usersValidators = require('../../validators/users');
const cacheHelpers = require('../../helpers/cache');

const buyAlbum = (resolve, root, args, context) =>
  usersValidators.validateAuthetication(root, args, context).then(() => resolve(root, args, context));

const album = (resolve, root, args, context, info) =>
  cacheHelpers.findInCacheOrResolve(resolve, root, args, context, info);

const albums = (resolve, root, args, context, info) =>
  cacheHelpers.findInCacheOrResolve(resolve, root, args, context, info);

const photos = (resolve, root, args, context, info) =>
  cacheHelpers.findInCacheOrResolve(resolve, root, args, context, info);

module.exports = {
  mutations: {
    buyAlbum
  },
  queries: {
    album,
    albums
  },
  typeResolvers: {
    photos
  }
};
