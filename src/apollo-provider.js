import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { SchemaLink } from "@apollo/client/link/schema"
import { addMocksToSchema, } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createApolloProvider } from "@vue/apollo-option";

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

const schema = makeExecutableSchema({ typeDefs });

const schemaWithMocks = addMocksToSchema({
  schema,
  mocks
});

const apolloCache = new InMemoryCache(window.__APOLLO_STATE__);

const apolloClient = () =>
  new ApolloClient({
    link: new SchemaLink({ schema: schemaWithMocks, validate: false }),
    cache: apolloCache,
  });

export const apolloProvider = () =>
  createApolloProvider({
    defaultClient: apolloClient()
  });
