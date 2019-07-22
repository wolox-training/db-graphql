const { queries, schema: queriesSchema } = require('./queries');
const { mutations, schema: mutationSchema } = require('./mutations');
const { typeResolvers } = require('./resolvers');

module.exports = {
  queries,
  mutations,
  typeResolvers,
  schemas: [queriesSchema, mutationSchema]
};
