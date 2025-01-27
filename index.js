const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Definir o esquema GraphQL
// const schema = buildSchema(`
//  type User {
//     id: ID
//     name: String
//     email: String
//  }

//  type Query {
//     users: [User]
//     user(id: ID!): User
//     usersLike(str: String!): [User]
//  }
// `);

// Resolvers para as queries
// const root = {
//     users: () => users,
//     user: ({ id }) => users.find(user => user.id === parseInt(id)),
//     usersLike: ({ str }) => users.filter(user => user.name.toLowerCase().includes(str.toLowerCase()))
// };

// Criar a aplicação Express
const app = express();

// Configurar o endpoint GraphQL
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Interface interativa para testar queries
}));

// Iniciar o servidor
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor GraphQL a correr em http://localhost:${PORT}/graphql`);
}); 