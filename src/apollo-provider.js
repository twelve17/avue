import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";
import { SchemaLink } from "apollo-link-schema";

import {
  addMocksToSchema,
  createMockStore,
  mockServer
} from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

/*
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
*/

/*
const schema = makeExecutableSchema({ typeDefs });
const schemaWithMocks = addMockFunctionsToSchema({
  schema,
  mocks
});
*/

const typeDefs = `
  type Message {
    id: Int!
    text: String!
  }
  type Query {
    message(id: Int!): Message
  }
`;

const message = (id) => ({
  id,
  text: "Hi"
});

const mocks = {
  Query: () => ({
    message: message(1)
  })
};

const resolvers = (store) => ({
  Query: {
    message: (obj, args) => {
      return message(args.id);
    }
  },
  Message: {}

  //Mutation: () => ...
});

const schema = makeExecutableSchema({ typeDefs });

const schemaWithMocks = addMocksToSchema({
  schema,
  mocks
});

/*
const schemaWithMocks = addMockFunctionsToSchema({
  schema,
  mocks
});
*/

//console.log("schemaWithMocks", schemaWithMocks);
// const store = createMockStore({ schema });

// addMocksToSchema({ schema });

const apolloCache = new InMemoryCache(window.__APOLLO_STATE__);

const apolloClient = () =>
  new ApolloClient({
    link: new SchemaLink({ schema: schemaWithMocks, validate: false }),
    cache: apolloCache,
    ssrMode: true
  });

export const apolloProvider = () =>
  createApolloProvider({
    defaultClient: apolloClient()
  });
