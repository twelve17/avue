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

const resolvers = () => ({
  Query: {
    message: (_, args) => ({ 
      id: args.id,
      text: "Hello World"
    })
  }
});

const schema = makeExecutableSchema({ typeDefs });
const schemaWithMocks = addMocksToSchema({ schema, resolvers });

const apolloClient = () =>
  new ApolloClient({
    link: new SchemaLink({ schema: schemaWithMocks, validate: false }),
    cache: new InMemoryCache(window.__APOLLO_STATE__)
  });

export const apolloProvider = () =>
  createApolloProvider({
    defaultClient: apolloClient()
  });
