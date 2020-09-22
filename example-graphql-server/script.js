const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  type Query {
    me: User!
  }
`;
const resolvers = {
  Query: {
    me() {
      return {
        email: "john@doe.com",
        avatar: "http://image.png",
        friends: [],
      };
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log("active on port 4000"));
