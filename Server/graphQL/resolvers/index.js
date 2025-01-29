const resolversUtilizador = require('./resolversUtilizador');

const resolvers = {
  Query: {
    ...resolversUtilizador.Query,
  },
  Mutation: {
    ...resolversUtilizador.Mutation,
  },
  Subscription: {
    ...resolversUtilizador.Subscription,
  },
};

module.exports = resolvers;