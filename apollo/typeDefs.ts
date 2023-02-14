import { gql } from "graphql-tag";
import { makeExecutableSchema } from "graphql-tools";

export const typeDefs = gql`
  type Query {
    hello: String
  }
`;

export const schema = makeExecutableSchema({ typeDefs });
