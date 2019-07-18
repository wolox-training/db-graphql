const { queries, schema: queriesSchema } = require('./queries');
const { mutations, schema: mutationSchema } = require('./mutations');
const { subscriptions, schema: subscriptionsSchema } = require('./subscriptions');
const middlewares = require('./middlewares');
const { typeResolvers } = require('./resolvers');

module.exports = {
  queries,
  mutations,
  subscriptions,
  middlewares,
  typeResolvers,
  schemas: [queriesSchema, mutationSchema, subscriptionsSchema]
};
