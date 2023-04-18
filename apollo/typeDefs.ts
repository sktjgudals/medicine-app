import { gql } from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";
export const typeDefs = gql`
  scalar JSON

  type User {
    id: String
    email: String
    nickname: String
    image: String
  }

  type CreateUserResponse {
    token: JSON
    error: Boolean!
  }

  type Query {
    hello: String
    test: String
    a: String
  }

  type Mutation {
    createLocalUser(
      email: String!
      nickname: String!
      password: String!
    ): CreateUserResponse
  }
`;

export const schema = makeExecutableSchema({ typeDefs });
