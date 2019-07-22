const { queries, schema: queriesSchema } = require('./queries');
const { mutations, schema: mutationSchema } = require('./mutations');
const { typeResolvers } = require('./resolvers');
const middlewares = require('./middlewares');

module.exports = {
  queries,
  mutations,
  middlewares,
  typeResolvers,
  schemas: [queriesSchema, mutationSchema]
};
