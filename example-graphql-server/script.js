const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  union Footwear = Sneaker | Boot

  enum ShoeType {
    NIKE
    ADIDAS
    TIMBERLAND
  }

  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  interface Shoe {
    brand: ShoeType!
    size: Int!
  }

  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    sport: String
  }

  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    hasGrip: Boolean
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
    shoes(input: ShoesInput): [Footwear]!
  }

  type Mutation {
    createShoe(input: NewShoeInput!): Shoe!
  }
`;

const resolvers = {
  Query: {
    shoes(_, { input }) {
      return [
        { brand: "NIKE", size: 14, sport: "basketball" },
        { brand: "TIMBERLAND", size: 12, hasGrip: true },
      ];
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

  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      return "Boot";
    },
  },

  Footwear: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      return "Boot";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log("active on port 4000"));
