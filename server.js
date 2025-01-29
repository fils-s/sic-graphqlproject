const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./Server/graphQL/resolvers/index');
const typeDefs = require('./Server/graphQL/typeDefs')
const { verificarUtilizador } = require('./Server/middlewares/jwt');

async function startServer() {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            const authHeader = req.headers.authorization || "";
            
            let utilizador = null;

            if (authHeader) {
                try {
                    utilizador = await verificarUtilizador(authHeader);
                } catch (error) {
                    console.error("Erro na autenticação:", error.message);
                }
            }

            return { utilizador };
        },
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor GraphQL a correr em http://localhost:${PORT}/graphql`);
    });
}

startServer()