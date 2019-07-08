const { queries, schema: queriesSchema } = require('./queries');
//  const { mutations, schema: mutationSchema } = require('./mutations');
//  const { subscriptions, schema: subscriptionsSchema } = require('./subscriptions');

module.exports = {
  queries,
  schemas: [queriesSchema]
};
