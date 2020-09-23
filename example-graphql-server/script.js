const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  enum ShoeType {
    NIKE
    ADIDAS
    TIMBERLAND
  }

  type User {
    email: String!
    avatar: String
    shoes: [Shoe]!
  }

  interface Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
  }

  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
    sport: String
  }

  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
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
    shoes(input: ShoesInput): [Shoe]!
  }

  type Mutation {
    createShoe(input: NewShoeInput!): Shoe!
  }
`;

const user = {
  id: 1,
  email: "john@doe.com",
  avatar: "http://image.png",
  shoes: [],
};

const shoes = [
  { brand: "NIKE", size: 14, sport: "basketball", user: 1 },
  { brand: "TIMBERLAND", size: 12, hasGrip: true, user: 1 },
];

const resolvers = {
  Query: {
    shoes(_, { input }) {
      return shoes;
    },
    me() {
      return user;
    },
  },

  Mutation: {
    createShoe(_, { input }) {
      return input;
    },
  },

  User: {
    shoes() {
      return shoes;
    },
  },

  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      return "Boot";
    },
  },

  Sneaker: {
    user(shoe) {
      return user;
    },
  },

  Boot: {
    user(shoe) {
      return user;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log("active on port 4000"));
