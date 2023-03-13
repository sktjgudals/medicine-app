import { gql } from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";
export const typeDefs = gql`
  type Query {
    hello: String
    test: String
    a: String
  }
`;

export const schema = makeExecutableSchema({ typeDefs });
