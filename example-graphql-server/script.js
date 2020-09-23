const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  enum ShoeType {
    NIKE
    ADIDAS
  }

  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  type Shoe {
    brand: ShoeType!
    size: Int!
  }

  input ShoesInput {
    brand: ShoeType
    size: Int
  }

  input NewShoeInput {
    brand: ShoeType!
    size: Int!
  }

  type Query {
    me: User!
    shoes(input: ShoesInput): [Shoe]!
  }

  type Mutation {
    createShoe(input: NewShoeInput!): Shoe!
  }
`;

const resolvers = {
  Query: {
    shoes(_, { input }) {
      return [
        { brand: "NIKE", size: 14 },
        { brand: "ADIDAS", size: 12 },
      ].filter((shoes) => shoes.brand === input.brand);
    },
    me() {
      return {
        email: "john@doe.com",
        avatar: "http://image.png",
        friends: [],
      };
    },
  },

  Mutation: {
    createShoe(_, { input }) {
      return input;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log("active on port 4000"));
