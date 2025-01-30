const resolversUtilizador = require('./resolversUtilizador');
const resolversRegisto = require('./resolversRegisto');

const resolvers = {
  Query: {
    ...resolversUtilizador.Query,
    ...resolversRegisto.Query,
  },
  Mutation: {
    ...resolversUtilizador.Mutation,
    ...resolversRegisto.Mutation,
  },
  Subscription: {
    ...resolversRegisto.Subscription,
  },
};

module.exports = resolvers;