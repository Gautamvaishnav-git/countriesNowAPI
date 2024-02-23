const { ApolloServer } = require("@apollo/server")
const express = require('express');
const cors = require('cors');
const { expressMiddleware } = require('@apollo/server/express4');
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader")
const { loadSchemaSync } = require("@graphql-tools/load")

const path = require('path');
const schemaPath = path.join(process.cwd(), '/graphql/schemas/countries.graphql');
const queryResolvers = require('./resolvers/countries');

const typeDefs = loadSchemaSync(schemaPath, {
    loaders: [new GraphQLFileLoader()]
})


const countries = [
    {
        country: "India",
        cities: ["Delhi", "Mumbai", "Bangalore"]
    }
];

/** 
 * Resolvers are the actual implementation of the GraphQL schema.
 * @type {{
 *  Query: {
 *      [x: string]: import("./types").QueryResolver
 *  }
 * }}
 */
const resolvers = {
    Query: queryResolvers
};


const gqlRouter = express.Router();

/**
 * standalone Apollo Server instance.
 */
const server = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
});

(async () => {
    console.log('Starting apollo server');
    await server.start();
    gqlRouter.use('/', cors(), express.json(), expressMiddleware(server));
    console.log('Apollo server started');
})();

module.exports = gqlRouter;