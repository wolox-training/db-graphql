const { queries, schema: queriesSchema } = require('./queries');
const { mutations, schema: mutationSchema } = require('./mutations');
const { subscriptions, schema: subscriptionsSchema } = require('./subscriptions');
const middlewares = require('./middlewares');

module.exports = {
  queries,
  mutations,
  subscriptions,
  middlewares,
  schemas: [queriesSchema, mutationSchema, subscriptionsSchema]
};
