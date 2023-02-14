import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { HttpLink } from "@apollo/client/link/http";
import { schema } from "./typeDefs";

const createIsomorphLink = () => {
  if (typeof window === "undefined") {
    return new SchemaLink({ schema });
  } else {
    return new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin",
    });
  }
};

const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  // Instead of "createHttpLink" use SchemaLink here
  link: createIsomorphLink(),
  cache: new InMemoryCache(),
});
