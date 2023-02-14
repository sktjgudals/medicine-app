import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "apollo/typeDefs";

const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({ req, res, user: await getLoggedInUser(req) }),
});

function getLoggedInUser(req: any) {
  console.log(req);
  return "hi";
}
