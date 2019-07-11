const { queries, schema: queriesSchema } = require('./queries');
const { typeResolvers } = require('./resolvers');

module.exports = {
  queries,
  typeResolvers,
  schemas: [queriesSchema]
};
