import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

// Client Side Schemas
// data is local
const typeDefs = gql`
  extend type User {
    age: Int
  }

  extend type Pet {
    vaccinated: Boolean!
  }
`;

const resolvers = {
  User: {
    age() {
      return 33;
    },
  },
  Pet: {
    vaccinated() {
      return true;
    },
  },
};

// add simulated delay to test optimistic ui
const delay = setContext(
  (request) =>
    new Promise((success, fail) => {
      setTimeout(() => {
        success();
      }, 800);
    })
);

const http = new HttpLink({
  uri: "http://localhost:4000/",
});

const link = ApolloLink.from([delay, http]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs,
});

export default client;
